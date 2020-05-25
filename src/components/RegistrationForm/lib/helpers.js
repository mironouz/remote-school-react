export const registerUser = async user => {
    const status = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.status)
    switch (status) {
        case 202: {
            alert('Вы зарегестрировались как ' + user.name + ' ' + user.surname)
            return
        }
        case 409: {
            alert('Пользователь ' + user.name + ' ' + user.surname + ' уже существует')
            return
        }
        default: {
            alert('Неизвестная ошибка. Код ' + status)
            return
        }
    }
}