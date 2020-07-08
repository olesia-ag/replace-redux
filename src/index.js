import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './hooks-store/products-store'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';


configureStore()

ReactDOM.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
,
  document.getElementById('root')
);
