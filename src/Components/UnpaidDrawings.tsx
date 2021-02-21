import React, { useEffect, useState } from "react";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";
import config from '../config.json';
import { useHistory } from "react-router-dom";
import { TrelloCard } from "../types";
import CardsList from "./CardsList";
import { addLabelToCard, getCards, getExchangeRate } from "../utils";

const UnpaidDrawings = () => {
  const [apiKey] = useStateWithLocalStorage(config.localStorageKeys.trelloApiKey);
  const [apiToken] = useStateWithLocalStorage(config.localStorageKeys.trelloApiToken);

  const history = useHistory();
  if (!apiKey || !apiToken) {
    history.push(config.urls.settings);
  }

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [altCurrencyRatio, setAltCurrencyRatio] = useState<number | undefined>(undefined);
  const [unpaidCards, setUnpaidCards] = useState<TrelloCard[]>([]);
  const [invoidedCards, setInvoicedCards] = useState<TrelloCard[]>([]);

  useEffect(() => {
    getExchangeRate(data => setAltCurrencyRatio(data))
  }, []);

  useEffect(() => {
    if (!apiKey || !apiToken) {
      return;
    }

    const unpaidPromise = getCards(config.trelloLists.sentToClientListId, apiKey, apiToken, (data) => setUnpaidCards(data.filter(c => !c.labels || !c.labels.length)));
    const invoicedPromise = getCards(config.trelloLists.sentToClientListId, apiKey, apiToken, (data) => setInvoicedCards(data.filter(c => c.labels && c.labels.some(l => l.id === config.labelsId.invoiced))));

    Promise.all([unpaidPromise, invoicedPromise]).then(() => setIsLoaded(true));
  }, [apiKey, apiToken]);

  const handleCreateInvoiceClick = () => {
    const promises = unpaidCards.map(c => addLabelToCard(c.id, config.labelsId.invoiced, apiKey, apiToken));
    Promise.all(promises).then(() => history.push(config.urls.invoiced));
  }

  return (
    <div className="container">
      <div className="row gy-3">
        <div className="col">
          <h3>Unpaid Orders</h3>
          {
            !isLoaded
              ? 'Loading...'
              : <CardsList cards={unpaidCards} altCurrencyRatio={altCurrencyRatio} />
          }
        </div>
      </div>
      <div className="row gy-3 ">
        <div className="col text-end">
          <button type="button" className="btn btn-outline-primary" disabled={!!invoidedCards.length} onClick={handleCreateInvoiceClick}>
            {invoidedCards.length ? 'Finish Previous Invoice First' : 'Create an Invoice'}
          </button>
        </div>
      </div>
    </div>
  )
};

export default UnpaidDrawings;