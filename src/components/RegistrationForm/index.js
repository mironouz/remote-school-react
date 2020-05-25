import React from "react";
import {registerUser} from "./lib/helpers";

export function RegistrationForm() {
    const getDataFromFormAndRegister = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        let user = {};
        data.forEach((value, key) => {
            user[key] = value
        });
        registerUser(user)
    }
    return (
        <form className="RegistrationForm" onSubmit={getDataFromFormAndRegister}>
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