import logo from './logo.svg';
import React from 'react'
import './App.css';
import Textfield from './components/Textfield';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
