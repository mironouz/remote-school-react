import {getAuth} from "../../../services/utils";

export const sendMessage = chatInput => {
    let message = {};
    message.text = chatInput.data.text
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

export const logout = () => {
    localStorage.removeItem('auth')
    window.location.href = '/'
}