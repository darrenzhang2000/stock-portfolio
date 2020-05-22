import React from 'react';
import './App.css';
import Login from './components/Login'
import RegisterContainer from './containers/Register'

function App() {
  return (
    <div className="App">
      Hello world
      <Login/>
      <RegisterContainer/>
    </div>
  );
}

export default App;