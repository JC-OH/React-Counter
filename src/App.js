import React from 'react';
import Counter from './components/Counter'
import CounterOld from './components/CounterOld'
import CounterContainer from './containers/CounterContainer'
function App() {
  return (
    <div className="App">
      <Counter/>
      <CounterContainer/>
      <CounterOld/>
    </div>
  );
}

export default App;
