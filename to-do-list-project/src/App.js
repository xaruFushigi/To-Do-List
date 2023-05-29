import React from 'react';
import './App.css';
import 'tachyons';

import { Header, Body, Footer } from './components';

const App = () => {
  return (
    <div className="App flex flex-column justify-center items-center">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
