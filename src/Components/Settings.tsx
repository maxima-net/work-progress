import config from '../config.json';
import useStateWithLocalStorage from '../hooks/useStateWithLocalStorage';
import { useHistory } from "react-router-dom";

const Settings = () => {
  const [apiKey, setApiKey] = useStateWithLocalStorage(config.localStorageKeys.trelloApiKey);
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  }
  
  const [apiToken, setApiToken] = useStateWithLocalStorage(config.localStorageKeys.trelloApiToken);
  const handleApiTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiToken(e.target.value);
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
            <input type="text" className="form-control" id="trelloApiKey" aria-describedby="emailHelp" value={apiKey} onChange={handleApiKeyChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="trelloApiToken" className="form-label">Trello API Token</label>
            <input type="text" className="form-control" id="trelloApiToken" value={apiToken} onChange={handleApiTokenChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  )
}

export default Settings;