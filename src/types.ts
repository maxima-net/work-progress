export interface TrelloLabel {
  color: string;
  id: string;
  idBoard: string;
  name: string;
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