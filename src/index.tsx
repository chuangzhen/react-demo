import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/global.scss';
import './styles/reset.css';
// import reportWebVitals from './reportWebVitals';

import { Switch, Route, BrowserRouter } from "react-router-dom";
// import 'lib-flexible'

import { initFireBase, initRem } from './utils/util'


// import CommonLayout from "./layout";
import JSX from './page/jsx';
import COMPONENT from './page/component';
import StatePage from './page/state';
import PropsPage from './page/props';
import Page404 from "./ErrorPage/page404";
import SyntheticEvents from "./page/syntheticEvents";
import LifeCircle from "./page/lifeCircle";

if (module && module?.hot) {
  module?.hot?.accept();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/404" exact component={Page404} />
        <Route path="/" exact component={JSX} />
        <Route path="/component" exact component={COMPONENT} />
        <Route path="/state" exact component={StatePage} />
        <Route path="/props" exact component={PropsPage} />
        <Route path="/syntheticEvents" exact component={SyntheticEvents} />
        <Route path="/lifeCircle" exact component={LifeCircle} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
//初始化firebase实例
initFireBase();
//初始化html标签的fontsize 
initRem()
