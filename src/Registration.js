import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import App from "./App";
import './Registration.css'

export default function Registration() {
    return (
        <Router>
            <div>
                <div className="Wrapper">
                    <form className="RegistrationForm" onSubmit={onSubmit}>
                        <label htmlFor="name">Имя</label><br/>
                        <input type="text" name="name" id="name"/><br/>
                        <label htmlFor="surname">Фамилия</label><br/>
                        <input type="text" name="surname" id="surname"/><br/>
                        <label htmlFor="grade">Класс</label><br/>
                        <select name="grade" id="grade">
                            <option value="FIFTH">Пятый</option>
                            <option value="SIXTH">Шестой</option>
                        </select>
                        <br/>
                        <button>Отправить</button>
                    </form>
                </div>
                <Switch>
                    <Route path="/home">
                        <App />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

const onSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    let object = {};
    data.forEach((value, key) => {
        object[key] = value
    });
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }).then(
        _ => window.location.href = '/home'
    );
}