import React from "react"
import { Tab, Tabs }  from "@material-ui/core"
import './Registration.css'

export default function Registration() {
    return (
        <div className="Wrapper">
            <Tabs centered>
                <Tab label="Registration"/>
                <Tab label="Login"/>
            </Tabs>
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
                <button>Зарегестрироваться</button>
            </form>
        </div>
    );
}

const onSubmit = e => {
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
                alert('Unknown error. Status code ' + response.status)
                return
            }
            alert('You have registered as ' + user.name + ' ' + user.surname)
        }
    );
}