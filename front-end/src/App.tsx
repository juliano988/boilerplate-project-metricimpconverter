import { useEffect, useState } from 'react';
import './App.scss';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

function App() {

  const [inputVal, setinputVal] = useState('');
  const [APIResponse, setAPIResponse] = useState({ message: 'Waiting for a requisition...' });

  async function handleButtonClick() {
    setAPIResponse({ message: 'Processing...' });
    const req = await fetch('https://boilerplate-project-metricimpconverter-2.juliano988.repl.co/api/convert?input=' + inputVal);
    const res = await req.text()
    try {
      setAPIResponse(JSON.parse(res))
    } catch (error) {
      setAPIResponse({ message: res })
    }
  }

  function handleButtonKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  }

  return (
    <div id="app-div">
      <h1>Metric/Imperial Converter API</h1>
      <br />
      <div id="content-div">
        <div id="col-1">
          <h5>Project proposal:</h5>
          <p>The proposal of this project is to create an API capable to convert metric/imperial units.</p>
          <h5>API domain:</h5>
          <code>https://boilerplate-project-metricimpconverter-2.juliano988.repl.co</code>
          <h5>Example usage:</h5>
          <pre><code>
            /api/convert?input=4gal<br />
            /api/convert?input=1/2km<br />
            /api/convert?input=5.4/3lbs<br />
            /api/convert?input=kg<br />
          </code></pre>
          <h5>Input field:</h5>
          <div id="input-div">
            <input id="input" onKeyPress={handleButtonKeyPress} value={inputVal} onChange={(e) => setinputVal(e.target.value)} type="text" placeholder="Exemple: 6L"></input>
            <button id="button" onClick={handleButtonClick} type="button">SEND</button>
          </div>
        </div>
        <div id="col-2">
          <JSONPretty id="json-pretty" data={APIResponse}></JSONPretty>
        </div>
      </div>
    </div>
  );
}

export default App;
