import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RootForm from "./components/RootForm";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "./components/Dashboard";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" component={RootForm}/>
                <Route exact path="/home" component={Dashboard}/>
                <Route exact path="/registration" component={RootForm} />
                <Route exact path="/login" component={RootForm} />
                <Redirect to="/" />
            </Switch>
        </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
