import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RootForm from "./Registration";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" component={RootForm}/>
                <Route exact path="/home" component={App}/>
                <Route exact path="/registration" component={RootForm} />
                <Route exact path="/login" component={RootForm} />
                <Redirect to="/registration" />
            </Switch>
        </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
