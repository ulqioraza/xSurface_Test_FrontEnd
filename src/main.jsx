import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//SBAdmin2 Style
//import './styles/scss/sb-admin-2.scss';
import '../src/styles/scss/sb-admin-2.css';
import { store } from './store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    
  <Provider store={store}>
      <App /> 
  </Provider>);

