import React, { useEffect, useState } from "react";
import Card from "./Card";
import useStateWithLocalStorage from "./hooks/useStateWithLocalStorage";
import config from './config.json';
import { useHistory } from "react-router-dom";

const inQueueListId = '5f4cdb937afb6a829d4ad8e6';
const inProgressListId = '5f4cdb937afb6a829d4ad8e7';
const inRevisionListId = '5f4cdb937afb6a829d4ad8ea';
const completedListId = '5f4cdb937afb6a829d4ad8e8';
const sentToClientListId = '5f4cdb937afb6a829d4ad8e9';

const Analytics = () => {
  const [apiKey] = useStateWithLocalStorage(config.localStorageKeys.trelloApiKey);
  const [apiToken] = useStateWithLocalStorage(config.localStorageKeys.trelloApiToken);

  const history = useHistory();
  if (!apiKey || !apiToken) {
    history.push(config.urls.settings);
  }

  const [isCardsLoaded, setIsCardsLoaded] = useState<boolean>(false);
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    if(!sentToClientListId || !apiKey || !apiToken) {
      return;
    }

    fetch(`https://api.trello.com/1/lists/${sentToClientListId}/cards?key=${apiKey}&token=${apiToken}&customFieldItems=true`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCards(data);
        setIsCardsLoaded(true);
      });
  }, [sentToClientListId, apiKey, apiToken]);

  const total = cards.reduce((summ, c) => summ += +c.customFieldItems[0].value.number, 0);
  const currentTotal = cards.filter(c => !c.labels || !c.labels.length).reduce((summ, c) => summ += +c.customFieldItems[0].value.number, 0);
  const withdrawnTotal = cards.filter(c => c.labels && c.labels.length).reduce((summ, c) => summ += +c.customFieldItems[0].value.number, 0);
  const leftToMinimumRedraw = Math.max(100 - currentTotal, 0);

  return (
    <div className="container">
      <div className="row gy-3">
        <div className="col-lg">
          <Card title="Current Income" value={currentTotal} isLoading={isCardsLoaded} />
        </div>
        <div className="col-lg">
          <Card title="Left to Withdraw" value={leftToMinimumRedraw} isLoading={isCardsLoaded} />
        </div>
        <div className="col-lg">
          <Card title="Withdrawn Earnings" value={withdrawnTotal} isLoading={isCardsLoaded} />
        </div>
        <div className="col-lg">
          <Card title="Total Income" value={total} isLoading={isCardsLoaded} />
        </div>
      </div>
    </div>
  )
};

export default Analytics;