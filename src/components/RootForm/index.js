import React, {useState} from "react"
import {Tab, Tabs} from "@material-ui/core"
import './style.css'
import {BrowserRouter, Link, Redirect, Route, Switch, useLocation} from "react-router-dom"
import {LoginForm} from "../LoginForm";
import {RegistrationForm} from "../RegistrationForm";
import {getActiveTab} from "./lib/helpers";

export default function RootForm() {
    const [activeTab, setActiveTab] = useState(getActiveTab(useLocation().pathname))
    return (
        <BrowserRouter>
            <div className="RegistrationWrapper">
                <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    centered
                >
                    <Tab label="Вход" component={Link} to='/login' />
                    <Tab label="Регистрация" component={Link} to='/registration' />
                </Tabs>
                <Switch>
                    <Route exact path="/login" component={LoginForm} />
                    <Route exact path="/registration" component={RegistrationForm} />
                    <Redirect to="/login" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}