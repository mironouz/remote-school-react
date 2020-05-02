import React from "react";
import './Registration.css'

export default function Registration() {
    return (
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
        _ => {
            user.auth = window.btoa(user.name + ':' + user.surname)
            localStorage.setItem('user', JSON.stringify(user))
            window.location.href = '/home'
        }
    );
}