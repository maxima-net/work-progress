import React, { useEffect, useState } from "react";
import Card from "./Card";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";
import config from '../config.json';
import { useHistory } from "react-router-dom";
import { TrelloCard } from "../types";

const inQueueListId = '5f4cdb937afb6a829d4ad8e6';
const inProgressListId = '5f4cdb937afb6a829d4ad8e7';
const inRevisionListId = '5f4cdb937afb6a829d4ad8ea';
const completedListId = '5f4cdb937afb6a829d4ad8e8';
const sentToClientListId = '5f4cdb937afb6a829d4ad8e9';

const getTotal = (cards: TrelloCard[]): number => {
  return cards.reduce((summ, c) => summ += +c.customFieldItems[0].value.number, 0);
}

const getFirstGroup = (string: string, regex: RegExp): string => {
  const match = regex.exec(string);
  return match && match[1] ? match[1].trim() : '';
}

const getShortDescription = (card: TrelloCard): string => {
  const orderNumber = getFirstGroup(card.desc, /Order Number:(.+)$/gm);
  const orderType = getFirstGroup(card.desc, /Order Type:(.+)$/gm);

  return `${orderNumber} (${orderType})`;
}

const Bills = () => {
  const [apiKey] = useStateWithLocalStorage(config.localStorageKeys.trelloApiKey);
  const [apiToken] = useStateWithLocalStorage(config.localStorageKeys.trelloApiToken);

  const history = useHistory();
  if (!apiKey || !apiToken) {
    history.push(config.urls.settings);
  }

  const [isLoaded, setIsCardsLoaded] = useState<boolean>(false);
  const [altCurrencyRatio, setAltCurrencyRatio] = useState<number | undefined>(undefined);
  const [cards, setCards] = useState<TrelloCard[]>([]);

  useEffect(() => {
    fetch('https://api.exchangeratesapi.io/latest?&base=USD&symbols=RUB')
      .then(r => r.json())
      .then(data => {
        setAltCurrencyRatio(data.rates.RUB);
      });
  }, [])

  useEffect(() => {
    if (!sentToClientListId || !apiKey || !apiToken) {
      return;
    }

    fetch(`https://api.trello.com/1/lists/${sentToClientListId}/cards?key=${apiKey}&token=${apiToken}&customFieldItems=true`)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        setCards(data);
        setIsCardsLoaded(true);
      });
  }, [sentToClientListId, apiKey, apiToken]);


  const unpaidCards = cards.filter(c => !c.labels || !c.labels.length);
  const currentTotal = getTotal(unpaidCards);

  return (
    <div className="container">
      <div className="row gy-3">
        <h3>Unpaid Orders</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col" align="right" style={{textAlign: 'right'}}>Coast (USD)</th>
              <th scope="col" align="right" style={{textAlign: 'right'}}>Coast (RUB)</th>
            </tr>
          </thead>
          <tbody>
            {unpaidCards.map((c, i) =>
              <tr key={c.id}>
                <th scope="row">{i + 1}</th>
                <td>{getShortDescription(c)}</td>
                <td align="right">{c.customFieldItems[0].value.number}</td>
                <td align="right">{altCurrencyRatio ? `${(c.customFieldItems[0].value.number * altCurrencyRatio).toFixed(2)}` : 'N/A'} </td>
              </tr>
            )}
            <tr className="table-success">
              <th scope="row">Total</th>
              <td colSpan={2} align="right"><b>{currentTotal}</b></td>
              <td align="right"><b>{altCurrencyRatio ? `${(currentTotal * altCurrencyRatio).toFixed(2)}` : 'N/A'}</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Bills;