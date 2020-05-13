import React, {useEffect, useState} from 'react';
import './App.css';
import 'eventsource/example/eventsource-polyfill'

export default function App() {
    const [messages, setMessages] = useState([])
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        let auth = JSON.parse(localStorage.getItem('auth'))
        let userMessages = new window.EventSourcePolyfill('/api/messages', {
            headers: {
                'Authorization': 'Basic ' + auth
            }})

        fetch('/api/exercises', {
            headers: {
                'Authorization': 'Basic ' + auth
            }
        })
            .then(response => response.json())
            .then(exercises => setExercises(exercises))

        userMessages.onmessage = e => {
            const parsedData = JSON.parse(e.data);
            setMessages(messages => [parsedData, ...messages]);
        }
        userMessages.onopen = _ => setMessages([])
        userMessages.onerror = _ => setMessages([])
    }, []);

    return (
        <div className="Wrapper">
            <form className="MessageForm" onSubmit={sendMessage}>
                <label htmlFor="text">Текст сообщения</label><br/>
                <input type="text" name="text" id="text"/><br/>
                <button>Отправить</button>
            </form>
            <button className="logoutButton" onClick={logout}>Выйти</button>
            <div className="UserList">
                {messages.map((m, i) =>
                    <p key={i}>{m.user.name} {m.user.surname} : {m.text} {m.timestamp}</p>)}
            </div>
            <div>
                {exercises.map((ex) =>
                    <div key={ex.id}>
                        <h1>{ex.title}</h1>
                        <p>{ex.description}</p>
                    </div>)}
            </div>
        </div>
    );
}

const sendMessage = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    let auth = JSON.parse(localStorage.getItem('auth'))
    let message = {};
    message.timestamp = Date.now()
    data.forEach((value, key) => {
        message[key] = value
    });
    fetch('/api/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + auth
        },
        body: JSON.stringify(message)
    }).then()
}

const logout = e => {
    e.preventDefault()
    localStorage.removeItem('auth')
    window.location.href = '/'
}