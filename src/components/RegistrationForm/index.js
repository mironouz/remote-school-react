import React from "react";
import {registerUser} from "./lib/helpers";

export function RegistrationForm() {
    return (
        <form className="RegistrationForm" onSubmit={registerUser}>
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