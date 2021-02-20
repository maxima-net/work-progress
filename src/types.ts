export interface TrelloLabel {
  color: string;
  id: string;
  idBoard: string;
  name: string;
}

export interface TrelloCustomField {
  id: string;
  idCustomField: string;
  idModel: string;
  modelType: string;
  value: { number: number }
  number: number
}

export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  labels: TrelloLabel[];
  customFieldItems: any[];
  shortUrl: string;
  url: string;
}