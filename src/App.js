import { useState, useEffect } from 'react';
import { getXmen } from './api/xmen';

function App() {

  const [ xmens, setXmens ] = useState([]);
  const [ errorState, setErrorState ] = useState({ hasError: false });

  useEffect(() => {
    getXmen().then((data) => setXmens(data.results)).catch(handleError);
  }, []);

  const handleError = (error) => {
    setErrorState({ hasError: true, message: error.message});
  }

  return (
      <>
      <ul>
        {errorState.hasError && <div>{errorState.message}</div>}
        {xmens.map((xmen) => (
          <li key={xmen.id}>{xmen.name}</li>
        ))}
      </ul>
      </>
  );
}

export default App;
