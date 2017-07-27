import './index.css';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './StateConfig/store';
import Login from './Login/Login';

ReactDOM.render(
    <Provider store={store} >
        <Login />
    </Provider>,
  document.getElementById('root'));
