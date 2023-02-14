import React from 'react';
import {Player} from './player/player';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Player />
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
