export const registerUser = e => {
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