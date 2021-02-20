import React, { useEffect, useState } from "react";
import Card from "./Card";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";
import config from '../config.json';
import { Link, useHistory } from "react-router-dom";
import { TrelloCard } from "../types";

const inQueueListId = '5f4cdb937afb6a829d4ad8e6';
const inProgressListId = '5f4cdb937afb6a829d4ad8e7';
const inRevisionListId = '5f4cdb937afb6a829d4ad8ea';
const completedListId = '5f4cdb937afb6a829d4ad8e8';
const sentToClientListId = '5f4cdb937afb6a829d4ad8e9';

const getCards = (listId: string, apiKey: string, apiToken: string, callback: (data: TrelloCard[]) => void): Promise<any> => {
  return fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}&customFieldItems=true`)
    .then(r => r.json())
    .then(data => callback(data));
}

const getTotal = (cards: TrelloCard[]): number => {
  return cards.reduce((summ, c) => summ += +c.customFieldItems[0].value.number, 0);
}

const Analytics = () => {
  const [apiKey] = useStateWithLocalStorage(config.localStorageKeys.trelloApiKey);
  const [apiToken] = useStateWithLocalStorage(config.localStorageKeys.trelloApiToken);

  const history = useHistory();
  if (!apiKey || !apiToken) {
    history.push(config.urls.settings);
  }

  const [isLoaded, setIsCardsLoaded] = useState<boolean>(false);
  const [altCurrencyRatio, setAltCurrencyRatio] = useState<number | undefined>(undefined);
  const [inQueueCards, setInQueueCards] = useState<TrelloCard[]>([]);
  const [inProgressCards, setInProgressCards] = useState<TrelloCard[]>([]);
  const [completedCards, setCompletedCards] = useState<TrelloCard[]>([]);
  const [inRevisionCards, setInRevisionCards] = useState<TrelloCard[]>([]);
  const [sentToClientCards, setSentToClientCards] = useState<TrelloCard[]>([]);

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

    const inQueueCardsPromise = getCards(inQueueListId, apiKey, apiToken, (data) => setInQueueCards(data.filter(c => c.id !== '5f4cdb937afb6a829d4ad8f2')));
    const inProgressCardsPromise = getCards(inProgressListId, apiKey, apiToken, (data) => setInProgressCards(data));
    const compleatedCardsPromise = getCards(completedListId, apiKey, apiToken, (data) => setCompletedCards(data));
    const inRevisionCardsPromise = getCards(inRevisionListId, apiKey, apiToken, (data) => setInRevisionCards(data));
    const sentToClientCardsPromise = getCards(sentToClientListId, apiKey, apiToken, (data) => setSentToClientCards(data));

    Promise.all([inQueueCardsPromise, inProgressCardsPromise, compleatedCardsPromise, inRevisionCardsPromise, sentToClientCardsPromise])
      .then(() => setIsCardsLoaded(true));

  }, [inQueueListId, inProgressListId, completedListId, inRevisionListId, sentToClientListId, apiKey, apiToken]);


  const inQueueTotal = getTotal(inQueueCards);
  const inProgressTotal = getTotal(inProgressCards);
  const completedTotal = getTotal(completedCards);
  const inRevisionTotal = getTotal(inRevisionCards);
  const sentToClientTotal = getTotal(sentToClientCards);

  const currentCards = sentToClientCards.filter(c => !c.labels || !c.labels.length);
  const currentTotal = getTotal(currentCards);

  const withdrawnCards = sentToClientCards.filter(c => c.labels && c.labels.length);
  const withdrawnTotal = getTotal(withdrawnCards);

  const leftToMinimumRedraw = Math.max(100 - currentTotal, 0);

  return (
    <div className="container">
      <div className="row gy-3">
        <div className="col-lg">
          <Card title="In Queue" value={inQueueTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {inQueueCards.length} drawings
          </Card>
        </div>
        <div className="col-lg">
          <Card title="In Progress" value={inProgressTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {inProgressCards.length} drawings
          </Card>
        </div>
        <div className="col-lg">
          <Card title="Completed" value={completedTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {completedCards.length} drawings
          </Card>
        </div>
        <div className="col-lg">
          <Card title="In Revision" value={inRevisionTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {inRevisionCards.length} drawings
          </Card>
        </div>
      </div>
      <br />
      <div className="row gy-3">
        <div className="col-lg">
          <Card title="Unpaid" value={currentTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio} badge={leftToMinimumRedraw === 0 ? 'Ready' : ''}>
            <Link to={config.urls.bills} className="card-link">{currentCards.length} drawings</Link>
          </Card>
        </div>
        <div className="col-lg">
          <Card title="Left to Withdraw" value={leftToMinimumRedraw} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {leftToMinimumRedraw === 0 ? <span className="text-success">Ready to Withdraw</span> : 'Required to Withdraw'}
          </Card>
        </div>
        <div className="col-lg">
          <Card title="Paid" value={withdrawnTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {withdrawnCards.length} drawings
          </Card>
        </div>
        <div className="col-lg">
          <Card title="Total" value={sentToClientTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {sentToClientCards.length} drawings
          </Card>
        </div>
      </div>
    </div>
  )
};

export default Analytics;