export const login = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    let user = {};
    data.forEach((value, key) => {
        user[key] = value
    });
    let auth = window.btoa(user.email + ':' + user.password)
    fetch('/api/checkUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(
        response => {
            switch (response.status) {
                case 200: {
                    localStorage.setItem('auth', JSON.stringify(auth))
                    window.location.href = '/home'
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
                    alert('Неизвестная ошибка. Код ' + response.status)
                    return
                }
            }
        }
    );
}