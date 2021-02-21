import React, { useEffect, useState } from "react";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";
import config from '../config.json';
import { useHistory } from "react-router-dom";
import { TrelloCard } from "../types";
import CardsList from "./CardsList";
import { getCards, getExchangeRate } from "../utils";

const PaidDrawings = () => {
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

    getCards(config.trelloLists.sentToClientListId, apiKey, apiToken, (data) => setCards(data.filter(c => c.labels && c.labels.some(l => l.id === config.labelsId.paid))))
      .then(() => setIsLoaded(true));

  }, [apiKey, apiToken]);
  
  if (!isLoaded) {
    return null;
  }
  
  return (
    <div className="container">
      <div className="row gy-3">
        <div className="col">
          <h3>Paid Orders</h3>
            <CardsList cards={cards} altCurrencyRatio={altCurrencyRatio} />
        </div>
      </div>
    </div>
  )
};

export default PaidDrawings;