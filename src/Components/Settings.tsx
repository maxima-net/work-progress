import config from '../config.json';
import useStateWithLocalStorage from '../hooks/useStateWithLocalStorage';
import { useHistory } from "react-router-dom";

const Settings = () => {
  const [trelloApiKey, setTrelloApiKey] = useStateWithLocalStorage(config.localStorageKeys.trelloApiKey);
  const handleTrelloApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrelloApiKey(e.target.value);
  }
  
  const [trelloApiToken, setTrelloApiToken] = useStateWithLocalStorage(config.localStorageKeys.trelloApiToken);
  const handleTrelloApiTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrelloApiToken(e.target.value);
  }

  const [payPalClientId, setPayPalClientId] = useStateWithLocalStorage(config.localStorageKeys.payPalClientId);
  const handlePayPalClientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayPalClientId(e.target.value);
  }
  
  const [payPalSecret, setPayPalSecret] = useStateWithLocalStorage(config.localStorageKeys.payPalSecret);
  const handlePayPalSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayPalSecret(e.target.value);
  }

  const history = useHistory();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(config.urls.home);
  }

  return (
    <div className="container">
      <h1>Settings</h1>
      <div className="row" style={{maxWidth: 600}}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="trelloApiKey" className="form-label">Trello API Key</label>
            <input type="text" className="form-control" id="trelloApiKey" aria-describedby="emailHelp" value={trelloApiKey} onChange={handleTrelloApiKeyChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="trelloApiToken" className="form-label">Trello API Token</label>
            <input type="text" className="form-control" id="trelloApiToken" value={trelloApiToken} onChange={handleTrelloApiTokenChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="payPalClientId" className="form-label">PayPal Client Id</label>
            <input type="text" className="form-control" id="payPalClientId" aria-describedby="emailHelp" value={payPalClientId} onChange={handlePayPalClientIdChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="payPalSecret" className="form-label">PayPal Secret</label>
            <input type="text" className="form-control" id="payPalSecret" value={payPalSecret} onChange={handlePayPalSecretChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  )
}

export default Settings;