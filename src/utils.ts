import { TrelloCard } from "./types";

export const getCards = (listId: string, apiKey: string, apiToken: string, callback: (data: TrelloCard[]) => void): Promise<any> => {
  return fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}&customFieldItems=true`)
    .then(r => r.json())
    .then(data => callback(data));
}
export const getExchangeRate = (callback: (rate: number) => void): Promise<any> => {
  return fetch('https://api.exchangeratesapi.io/latest?&base=USD&symbols=RUB')
    .then(r => r.json())
    .then(data => {
      callback(data.rates.RUB);
    });
}