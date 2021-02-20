import React, { useEffect, useState } from "react";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";
import config from '../config.json';
import { useHistory } from "react-router-dom";
import { TrelloCard } from "../types";
import CardsList from "./CardsList";
import { getCards, getExchangeRate } from "../utils";

const UnpaidDrawings = () => {
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

    getCards(config.trelloLists.sentToClientListId, apiKey, apiToken, (data) => setCards(data.filter(c => !c.labels || !c.labels.length)))
      .then(() => setIsLoaded(true));

  }, [apiKey, apiToken]);

  return (
    <div className="container">
      <div className="row gy-3">
        <h3>Unpaid Orders</h3>
        {
          !isLoaded
            ? 'Loading...'
            : <CardsList cards={cards} altCurrencyRatio={altCurrencyRatio} />
        }
      </div>
    </div>
  )
};

export default UnpaidDrawings;