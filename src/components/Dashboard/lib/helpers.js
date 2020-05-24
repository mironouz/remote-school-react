import {getAuth} from "../../../services/utils";

export const sendMessage = m => {
    let message = {};
    message.text = m.data.text
    message.timestamp = Date.now()
    fetch('/api/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + getAuth()
        },
        body: JSON.stringify(message)
    }).then()
}

export const logout = e => {
    e.preventDefault()
    localStorage.removeItem('auth')
    window.location.href = '/'
}