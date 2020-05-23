import React from 'react';
import './App.css';
import LoginContainer from './containers/Login'
import RegisterContainer from './containers/Register'

function App() {
  return (
    <div className="App">
      Hello world
      <LoginContainer/>
      <RegisterContainer/>
    </div>
  );
}

export default App;