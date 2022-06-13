import { useState, useEffect, useRef } from 'react';
import { getXmen, searchDetails, searchXmen } from './api/xmen';

function App() {

  const inputTextRef = useRef(null);
  const [ xmens, setXmens ] = useState([]);
  const [ searchFeatures, setSearchFeatures ] = useState(1);
  const [ details, setDetails ] = useState({});
  const [ textInput, setTextInput ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ errorState, setErrorState ] = useState({ hasError: false });

  useEffect(() => {
    getXmen(page).then(setXmens).catch(handleError);
  }, [page]);

  useEffect(() => {
    searchDetails(searchFeatures).then(setDetails).catch(handleError);
  }, [searchFeatures]);

  const handleError = (error) => {
    setErrorState({ hasError: true, message: error.message});
  }

  const showDetails = (xmen) => {
    const id = xmen.id;
    setSearchFeatures(id);
  }

  const writtenText = (event) => {
    event.preventDefault();
    const text = inputTextRef.current.value;
    setTextInput(text);
  }

  const textToFind = (event) => {
    if(event.key !== 'Enter') return;
    inputTextRef.current.value = "";
    setDetails({});

    searchXmen(textInput).then(setXmens).catch(handleError);
  }

  const onTurnPage = (next) => {
    if(!xmens.prev && page + next <= 0) return;
    if(!xmens.next && page + next >= 3) return;

    setPage( page + next);
  }

  return (
      <>
      <ul>
        <h1>X-Men name</h1>
        <input 
          ref={inputTextRef}
          type="text"
          placeholder='Search X-men'
          onChange={writtenText}
          onKeyDown={textToFind}  
        />
        {errorState.hasError && <div>{errorState.message}</div>}
        {xmens?.results?.map((xmen) => (
          <li key={xmen.id} onClick={() => showDetails(xmen)}>{xmen.name}</li>
        ))}
      </ul>
      <section>
        <button onClick={() => onTurnPage(-1)}>PREV</button>
          | {page} |
        <button onClick={() => onTurnPage(1)}>NEXT</button>
      </section>
      {details && (
        <aside>
          <h2>{details.name}</h2>
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
