import CountUp from 'react-countup';

export interface CardProps {
  isLoading: boolean;
  title: string;
  value: number;
  altCurrencyRatio?: number;
  badge?: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="card bg-light bg-gradient">
      <div className="card-body">
        <h6 className="card-subtitle mb-2">{props.title} <span className="badge bg-primary" style={{float: 'right'}}>{props.badge}</span></h6>
        <h5 className="card-title text-success">
          {!props.isLoading 
            ? <>
                <CountUp prefix="$" separator="," end={props.value} />
                {props.altCurrencyRatio && <><span> / </span><CountUp suffix=" ₽" separator="," end={props.value * props.altCurrencyRatio} /></>} 
              </>
            : 'Loading...'}
        </h5>
        <p className="card-text">{!props.isLoading ? props.children : 'Loading...'}</p>
      </div>
    </div>
  );
}

export default Card;