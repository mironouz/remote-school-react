import React, {useState, useEffect} from 'react';
import './App.css';
import 'eventsource/example/eventsource-polyfill'

export default function App() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'))
        let userMessages = new window.EventSourcePolyfill('/api/messages', {
            headers: {
                'Authorization': 'Basic ' + user.auth
            }})
        userMessages.onmessage = e => {
            const parsedData = JSON.parse(e.data);
            setMessages(messages => [parsedData, ...messages]);
        }
        userMessages.onopen = _ => setMessages([])
    }, []);

    return (
        <div className="Wrapper">
            <form className="MessageForm" onSubmit={sendMessage}>
                <label htmlFor="text">Текст сообщения</label><br/>
                <input type="text" name="text" id="text"/><br/>
                <button>Отправить</button>
            </form>
            <div className="UserList">
                {messages.map((m, i) =>
                    <p key={i}>{m.user.name} {m.user.surname} : {m.text} {m.timestamp}</p>)}
            </div>
        </div>
    );
}

const sendMessage = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    let user = JSON.parse(localStorage.getItem('user'))
    let message = {};
    message.user = {'name': user.name, 'surname': user.surname, 'grade': user.grade}
    message.timestamp = Date.now()
    data.forEach((value, key) => {
        message[key] = value
    });
    fetch('/api/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + user.auth
        },
        body: JSON.stringify(message)
    }).then()
}