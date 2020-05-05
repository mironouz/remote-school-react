import React, {useState} from "react"
import { Tab, Tabs }  from "@material-ui/core"
import './Registration.css'
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom"

export default function RootForm(props) {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <BrowserRouter>
            <div className="Wrapper">
                <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    centered
                >
                    <Tab label="Регистрация" component={Link} to='/registration' />
                    <Tab label="Вход" component={Link} to='/login' />
                </Tabs>
                <Switch>
                    <Route exact path="/registration" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route path="*">
                        <Redirect to="/registration" />
                    </Route>
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
            </select>
            <br/>
            <button>Зарегестрироваться</button>
        </form>
    );
}

function Login() {
    return (
        <form className="RegistrationForm" onSubmit={register}>
            <label htmlFor="name">Имя</label><br/>
            <input type="text" name="name" id="name"/><br/>
            <label htmlFor="surname">Фамилия</label><br/>
            <input type="text" name="surname" id="surname"/><br/>
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
            if (response.status !== 202) {
                alert('Неизвестная ошибка. Код ' + response.status)
                return
            }
            alert('Вы зарегестрировались как ' + user.name + ' ' + user.surname)
        }
    );
}