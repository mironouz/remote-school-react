import {setAuth} from "../../../services/utils";

export const login = async user => {
    const auth = window.btoa(user.email + ':' + user.password)
    const status = await fetch('/api/checkUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.status)
    switch (status) {
        case 200: {
            setAuth(auth)
            window.location.assign('/home')
            return
        }
        case 400: {
            alert('Пользователь не существует')
            return
        }
        case 409: {
            alert('Неверный пароль')
            return
        }
        default: {
            alert('Неизвестная ошибка. Код ' + status)
            return
        }
    }
}