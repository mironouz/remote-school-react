import React from "react";
import {login} from "./lib/helpers";

export function LoginForm() {
    const getDataFromFormAndLogin = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        let user = {};
        data.forEach((value, key) => {
            user[key] = value
        });
        login(user)
    }
    return (
        <form className="RegistrationForm" onSubmit={getDataFromFormAndLogin}>
            <label htmlFor="email">Email</label><br/>
            <input type="text" name="email" id="email"/><br/>
            <label htmlFor="password">Пароль</label><br/>
            <input type="password" name="password" id="password"/><br/>
            <button>Войти</button>
        </form>
    );
}