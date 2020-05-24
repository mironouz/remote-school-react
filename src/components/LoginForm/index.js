import React from "react";
import {login} from "./lib/helpers";

export function LoginForm() {
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