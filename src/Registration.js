import React, {useState} from "react"
import {Tab, Tabs} from "@material-ui/core"
import './Registration.css'
import {BrowserRouter, Link, Redirect, Route, Switch, useLocation} from "react-router-dom"

export default function RootForm() {
    let location = useLocation().pathname
    const [activeTab, setActiveTab] = useState(getActiveTab(location))

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
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/registration" component={Registration} />
                    <Redirect to="/login" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

function Registration() {
    return (
        <form className="RegistrationForm" onSubmit={register}>
            <label htmlFor="name">Имя</label><br/>
            <input type="text" name="name" id="name"/><br/>
            <label htmlFor="surname">Фамилия</label><br/>
            <input type="text" name="surname" id="surname"/><br/>
            <label htmlFor="grade">Класс</label><br/>
            <select name="grade" id="grade">
                <option value="FIFTH">Пятый</option>
                <option value="SIXTH">Шестой</option>
            </select><br/>
            <label htmlFor="email">Email</label><br/>
            <input type="text" name="email" id="email"/><br/>
            <label htmlFor="password">Пароль</label><br/>
            <input type="password" name="password" id="password"/><br/>
            <button>Зарегестрироваться</button>
        </form>
    );
}

function Login() {
    return (
        <form className="RegistrationForm" onSubmit={login}>
            <label htmlFor="email">Email</label><br/>
            <input type="text" name="email" id="email"/><br/>
            <label htmlFor="password">Пароль</label><br/>
            <input type="password" name="password" id="password"/><br/>
            <button>Войти</button>
        </form>
    );
}

const register = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    let user = {};
    data.forEach((value, key) => {
        user[key] = value
    });
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(
        response => {
            switch (response.status) {
                case 202: {
                    alert('Вы зарегестрировались как ' + user.name + ' ' + user.surname)
                    return
                }
                case 409: {
                    alert('Пользователь ' + user.name + ' ' + user.surname + ' уже существует')
                    return
                }
                default: {
                    alert('Неизвестная ошибка. Код ' + response.status)
                    return
                }
            }
        }
    );
}

const login = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    let user = {};
    data.forEach((value, key) => {
        user[key] = value
    });
    let auth = window.btoa(user.email + ':' + user.password)
    fetch('/api/checkUser', {
        headers: {
            'Authorization': 'Basic ' + auth
        }
    }).then(
        response => {
            switch (response.status) {
                case 200: {
                    localStorage.setItem('auth', JSON.stringify(auth))
                    window.location.href = '/home'
                    return
                }
                case 401: {
                    alert('Неверный пароль или данный пользователь не существует')
                    return
                }
                default: {
                    alert('Неизвестная ошибка. Код ' + response.status)
                    return
                }
            }
        }
    );
}

const getActiveTab = path => {
    switch(path) {
        case '/login': return 0;
        case '/registration': return 1;
        default: return 0;
    }
}