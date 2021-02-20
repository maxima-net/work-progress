import { TrelloCard } from "../types";

export interface CardsListProps {
  cards: TrelloCard[];
  altCurrencyRatio?: number;
}

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

  return `Order Number: ${orderNumber} (${orderType || card.name})`;
}

const CardsList: React.FC<CardsListProps> = (props) => {
  const currentTotal = getTotal(props.cards);

  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col" align="right" style={{ textAlign: 'right' }}>Cost (USD)</th>
          <th scope="col" align="right" style={{ textAlign: 'right' }}>Cost (RUB)</th>
          <th scope="col" align="right" style={{ textAlign: 'right' }}>Link</th>
        </tr>
      </thead>
      <tbody>
        {props.cards.map((c, i) =>
          <tr key={c.id}>
            <th scope="row">{i + 1}</th>
            <td>{getShortDescription(c)}</td>
            <td align="right">{c.customFieldItems[0].value.number}</td>
            <td align="right">{props.altCurrencyRatio ? `${(c.customFieldItems[0].value.number * props.altCurrencyRatio).toFixed(2)}` : 'N/A'}</td>
            <td align="right"><a href={c.shortUrl} className="link-primary">Link</a></td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr className="table-success">
          <th scope="row">Total</th>
          <td colSpan={2} align="right"><b>${currentTotal}</b></td>
          <td align="right"><b>{props.altCurrencyRatio ? `${(currentTotal * props.altCurrencyRatio).toFixed(2)}₽` : 'N/A'}</b></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  )
};

export default CardsList;