import { TrelloCard } from "../types";
import { getShortCardDescription } from "../utils";

export interface CardsListProps {
  cards: TrelloCard[];
  altCurrencyRatio?: number;
}

const getTotal = (cards: TrelloCard[]): number => {
  return cards.reduce((summ, c) => summ += +c.customFieldItems[0].value.number, 0);
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
        </tr>
      </thead>
      <tbody>
        {props.cards.map((c, i) =>
          <tr key={c.id}>
            <th scope="row">{i + 1}</th>
            <td><a className="link-dark" target="_blank" href={c.shortUrl}>{getShortCardDescription(c)}</a></td>
            <td align="right">{c.customFieldItems[0].value.number}</td>
            <td align="right">{props.altCurrencyRatio ? `${(c.customFieldItems[0].value.number * props.altCurrencyRatio).toFixed(0)}` : 'N/A'}</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={2} scope="row">Total</th>
          <td  align="right"><b>${currentTotal}</b></td>
          <td align="right"><b>{props.altCurrencyRatio ? `${(currentTotal * props.altCurrencyRatio).toFixed(0)}₽` : 'N/A'}</b></td>
        </tr>
      </tfoot>
    </table>
  )
};

export default CardsList;