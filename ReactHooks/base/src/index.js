import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

/* Context ContextType */
import Context from './context/Context';
// import ContextType from './context/ContextType';

/* Lazy Suspense */
import Lazy from './lazy/index'

/* memo */
import Memo from './memo/index'

ReactDOM.render(
  <React.StrictMode>
    {/* <Context /> */}

    {/* <Lazy/> */}
    
    <Memo/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
