import React, { useEffect, useState } from "react";
import Card from "./Card";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";
import config from '../config.json';
import { Link, useHistory } from "react-router-dom";
import { TrelloCard } from "../types";
import { getCards, getExchangeRate } from "../utils";

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
    getExchangeRate(data => setAltCurrencyRatio(data))
  }, []);

  useEffect(() => {
    if (!apiKey || !apiToken) {
      return;
    }

    const inQueueCardsPromise = getCards(config.trelloLists.inQueueListId, apiKey, apiToken, (data) => setInQueueCards(data.filter(c => c.id !== '5f4cdb937afb6a829d4ad8f2')));
    const inProgressCardsPromise = getCards(config.trelloLists.inProgressListId, apiKey, apiToken, (data) => setInProgressCards(data));
    const compleatedCardsPromise = getCards(config.trelloLists.completedListId, apiKey, apiToken, (data) => setCompletedCards(data));
    const inRevisionCardsPromise = getCards(config.trelloLists.inRevisionListId, apiKey, apiToken, (data) => setInRevisionCards(data));
    const sentToClientCardsPromise = getCards(config.trelloLists.sentToClientListId, apiKey, apiToken, (data) => setSentToClientCards(data));

    Promise.all([inQueueCardsPromise, inProgressCardsPromise, compleatedCardsPromise, inRevisionCardsPromise, sentToClientCardsPromise])
      .then(() => setIsCardsLoaded(true));

  }, [apiKey, apiToken]);


  const inQueueTotal = getTotal(inQueueCards);
  const inProgressTotal = getTotal(inProgressCards);
  const completedTotal = getTotal(completedCards);
  const inRevisionTotal = getTotal(inRevisionCards);
  const sentToClientTotal = getTotal(sentToClientCards);

  const currentCards = sentToClientCards.filter(c => !c.labels || !c.labels.length);
  const currentTotal = getTotal(currentCards);

  const invoicedCards = sentToClientCards.filter(c => c.labels && c.labels.some(l => l.name === config.labels.invoiced));
  const invoicedTotal = getTotal(invoicedCards);

  const paidCards = sentToClientCards.filter(c => c.labels && c.labels.some(l => l.name === config.labels.paid));
  const paidTotal = getTotal(paidCards);

  const leftToMinimumRedraw = Math.max(100 - currentTotal, 0);

  return (
    <div className="container">
      <div className="row gy-3">
        <div className="col-lg">
          <Card title="In Queue" value={inQueueTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {inQueueCards.length} drawing(s)
          </Card>
        </div>
        <div className="col-lg">
          <Card title="In Progress" value={inProgressTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {inProgressCards.length} drawing(s)
          </Card>
        </div>
        <div className="col-lg">
          <Card title="Completed" value={completedTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {completedCards.length} drawing(s)
          </Card>
        </div>
        <div className="col-lg">
          <Card title="In Revision" value={inRevisionTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {inRevisionCards.length} drawing(s)
          </Card>
        </div>
      </div>
      <br />
      <div className="row gy-3">
        <div className="col-lg">
          <Card title="Unpaid" value={currentTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio} badge={leftToMinimumRedraw === 0 ? 'Ready' : ''}>
            <Link to={config.urls.unpaid} className="card-link">{currentCards.length} drawing(s)</Link>
          </Card>
        </div>
        <div className="col-lg">
          <Card title="Invoiced" value={invoicedTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            <Link to={config.urls.invoiced} className="card-link">{invoicedCards.length} drawing(s)</Link>
          </Card>
        </div>
        <div className="col-lg">
          <Card title="Paid" value={paidTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            <Link to={config.urls.paid} className="card-link">{paidCards.length} drawing(s)</Link>
          </Card>
        </div>
        <div className="col-lg">
          <Card title="Total" value={sentToClientTotal} isLoading={!isLoaded} altCurrencyRatio={altCurrencyRatio}>
            {sentToClientCards.length} drawing(s)
          </Card>
        </div>
      </div>
    </div>
  )
};

export default Analytics;