import React, { useEffect, useState } from "react";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";
import config from '../config.json';
import { useHistory } from "react-router-dom";
import { TrelloCard } from "../types";
import CardsList from "./CardsList";
import { addLabelToCard, getCards, getExchangeRate, removeLabelFromCard } from "../utils";

const InvoicedDrawings = () => {
  const [apiKey] = useStateWithLocalStorage(config.localStorageKeys.trelloApiKey);
  const [apiToken] = useStateWithLocalStorage(config.localStorageKeys.trelloApiToken);

  const history = useHistory();
  if (!apiKey || !apiToken) {
    history.push(config.urls.settings);
  }

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [altCurrencyRatio, setAltCurrencyRatio] = useState<number | undefined>(undefined);
  const [cards, setCards] = useState<TrelloCard[]>([]);

  useEffect(() => {
    getExchangeRate(data => setAltCurrencyRatio(data))
  }, []);

  useEffect(() => {
    if (!apiKey || !apiToken) {
      return;
    }

    getCards(config.trelloLists.sentToClientListId, apiKey, apiToken, (data) => setCards(data.filter(c => c.labels && c.labels.some(l => l.id === config.labelsId.invoiced))))
      .then(() => setIsLoaded(true));

  }, [apiKey, apiToken]);

  const handleMakeUnpaidClick = () => {
    const promises = cards.map(c => removeLabelFromCard(c.id, config.labelsId.invoiced, apiKey, apiToken));
    Promise.all(promises).then(() => history.push(config.urls.unpaid));
  }

  const handleMakePaidClick = () => {
    // const promisesForRemoving = cards.map(c => removeLabelFromCard(c.id, config.labelsId.invoiced, apiKey, apiToken));
    // const promisesForAdding = cards.map(c => addLabelToCard(c.id, config.labelsId.paid, apiKey, apiToken));
    // Promise.all([...promisesForAdding, ...promisesForRemoving]).then(() => history.push(config.urls.paid));
  }

  return (
    <div className="container">
      <div className="row gy-3">
        <div className="col">
          <h3>Invoiced Orders</h3>
          {
            !isLoaded
              ? 'Loading...'
              : <CardsList cards={cards} altCurrencyRatio={altCurrencyRatio} />
          }
        </div>
      </div>
      <div className="row gy-3 ">
        <div className="col">
          <button type="button" className="btn btn-outline-secondary" onClick={handleMakeUnpaidClick}>Make Unpaid</button>
        </div>
        <div className="col text-end">
          <button type="button" className="btn btn-outline-primary" onClick={handleMakePaidClick}>Make Paid</button>
        </div>
      </div>
    </div>
  )
};

export default InvoicedDrawings;