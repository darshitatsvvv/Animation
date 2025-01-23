import React from 'react';
import Grid from './components/Grid';
import './assets/styles.css';

function App() {
  return (
    <div className="app">
      <Grid rows={15} cols={20} />
    </div>
  );
}

export default App;
