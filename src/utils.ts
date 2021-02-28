import { TrelloCard } from './types';

export const getCards = (listId: string, apiKey: string, apiToken: string, callback: (data: TrelloCard[]) => void): Promise<any> => {
  return fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}&customFieldItems=true`)
    .then(r => r.json())
    .then((data: TrelloCard[]) => callback(data.filter(c => c.customFieldItems[0]?.value?.number)));
}
export const getExchangeRate = (callback: (rate: number) => void): Promise<any> => {
  return fetch('https://api.exchangeratesapi.io/latest?&base=USD&symbols=RUB')
    .then(r => r.json())
    .then(data => {
      callback(data.rates.RUB);
    });
}

export const addLabelToCard = (cardId: string, labelId: string, apiKey: string, apiToken: string) => {
  return fetch(`https://api.trello.com/1/cards/${cardId}/idLabels?key=${apiKey}&token=${apiToken}&value=${labelId}`, { method: 'POST' });
}

export const removeLabelFromCard = (cardId: string, labelId: string, apiKey: string, apiToken: string) => {
  return fetch(`https://api.trello.com/1/cards/${cardId}/idLabels/${labelId}?key=${apiKey}&token=${apiToken}`, { method: 'DELETE' });
}

export const getPayPalAuthToken = (clientId: string, secret: string): Promise<string> => {
  const credentials = btoa(`${clientId}:${secret}`);
  
  const headers = new Headers();
  headers.append('Authorization', `Basic ${credentials}`);
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');

  const requestOptions: RequestInit = { method: 'POST', headers, body, redirect: 'follow' };

  return fetch('https://api-m.paypal.com/v1/oauth2/token', requestOptions)
    .then(r => r.json())
    .then(data => data['access_token'] as string);
}

export const getPayPalInvoiceTemplate = (authToken: string): Promise<{}> => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = { method: 'GET', headers, redirect: 'follow' };

  return fetch('https://api.paypal.com/v2/invoicing/templates/TEMP-0XJ98350B9132814N', requestOptions)
    .then(r => r.json())
}

export const createDraftInvoice = (authToken: string, template: any, cards: TrelloCard[]): Promise<{}> => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Content-Type', 'application/json');

  const itemName = template.template_info.items[0].name;

  const data = template.template_info;
  data.items = cards.map(c => ({
    name: itemName,
    description: getShortCardDescription(c),
    unit_amount: { currency_code: 'USD', value: c.customFieldItems[0].value.number },
    quantity: 1,
  }));

  const requestOptions: RequestInit = { method: 'POST', headers, body: JSON.stringify(data), redirect: 'follow' };

  return fetch('https://api.paypal.com/v2/invoicing/invoices', requestOptions)
    .then(r => r.json())
}

const getFirstGroup = (string: string, regex: RegExp): string => {
  const match = regex.exec(string);
  return match && match[1] ? match[1].trim() : '';
}

export const getShortCardDescription = (card: TrelloCard): string => {
  const orderNumber = getFirstGroup(card.desc, /Order Number:(.+)$/gm);
  const orderType = getFirstGroup(card.desc, /Order Type:(.+)$/gm);

  let result = '';
  if (orderNumber) {
    result += `Order Number: ${orderNumber} (${orderType || card.name})`
  } else {
    result += `Order Number: ${card.name} (${card.desc.split('\n')[0]})`;
  }

  return result;
}