import CountUp from 'react-countup';

export interface CardProps {
  isLoading: boolean;
  title: string;
  value: number;
  altCurrencyRatio?: number;
}

const Card = (props: CardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-subtitle mb-2">{props.title}</h6>
        <h5 className="card-title text-success">
          {props.isLoading 
            ? <>
                <CountUp prefix="$" separator="," end={props.value} />
                {props.altCurrencyRatio && <><span> / </span><CountUp prefix="~" suffix=" ₽" separator="," end={props.value * props.altCurrencyRatio} /></>} 
              </>
            : 'Loading...'}
        </h5>
      </div>
    </div>
  );
}

export default Card;