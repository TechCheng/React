import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

/* Context ContextType */
import Context from './1.context/Context';
// import ContextType from './context/ContextType';

/* Lazy Suspense */
import Lazy from './2.lazy/index'

/* memo */
import Memo from './3.memo/index'

/* useState */
import UseState from './4.Hooks/1.useState'

/* useEffect */
import UseEffect from './4.Hooks/2.useEffect'

/* useContext */
import UseContext from './4.Hooks/3.useContext'

/* memo callback */
import MemoCall from './4.Hooks/4.memo&&callback'

/* useRef */
import UseRef from './4.Hooks/5.useRef'

/* useContext */
import DiyHooks from './4.Hooks/6.diyHooks'

ReactDOM.render(
  <React.StrictMode>
    {/* <Context /> */}

    {/* <Lazy/> */}

    {/* <Memo/> */}

    {/* <UseState/> */}

    {/* <UseContext/> */}

    {/* <UseEffect/> */}

    {/* <MemoCall/> */}

    {/* <UseRef/> */}

    <DiyHooks/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
