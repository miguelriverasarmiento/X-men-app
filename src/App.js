import { useState, useEffect } from 'react';
import { getXmen, searchDetails } from './api/xmen';

function App() {

  const [ xmens, setXmens ] = useState([]);
  const [ searchXmen, setSearchXmen ] = useState(1);
  const [ details, setDetails ] = useState({});
  const [ errorState, setErrorState ] = useState({ hasError: false });

  useEffect(() => {
    getXmen().then((data) => setXmens(data.results)).catch(handleError);
  }, []);

  useEffect(() => {
    searchDetails(searchXmen).then(setDetails).catch(handleError);
  }, [searchXmen]);

  const handleError = (error) => {
    setErrorState({ hasError: true, message: error.message});
  }

  const showDetails = (xmen) => {
    const id = xmen.id;
    setSearchXmen(id);
  }

  return (
      <>
      <ul>
        {errorState.hasError && <div>{errorState.message}</div>}
        {xmens.map((xmen) => (
          <li key={xmen.id} onClick={() => showDetails(xmen)}>{xmen.name}</li>
        ))}
      </ul>
      {details && (
        <aside>
          <h1>{details.name}</h1>
          <ul>
            <li>Nickname: {details.alias}</li>
            <li>Power: {details.powers}</li>
            <li>description: {details.description}</li>
          </ul>
        </aside>
      )}
      </>
  );
}

export default App;
