import React, {useEffect, useState} from 'react'
import './App.css'
import 'eventsource/example/eventsource-polyfill'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import {Launcher} from 'react-chat-window'
import Exercise from "./Exercise"

export default function App() {
    const [messages, setMessages] = useState([])
    const [exercises, setExercises] = useState([])
    const [listening, setListening] = useState(false)

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'))
        fetch('/api/exercises', {
            headers: {
                'Authorization': 'Basic ' + auth
            }
        })
            .then(response => response.json())
            .then(exercises => setExercises(exercises))

        if(!listening) {
            const eventSource = new window.EventSourcePolyfill('/api/messages', {
                headers: {
                    'Authorization': 'Basic ' + auth
                }})
            eventSource.onmessage = e => {
                const data = JSON.parse(e.data);
                const text = `${data.timestamp}\n${data.user.name} ${data.user.surname}\n${data.text}`
                const message = {author: 'them', data: {text: text}, type: 'text'}
                setMessages(messages => messages.concat(message))
            }
            setListening(true)
        }
    }, [listening]);

    return (
        <BrowserRouter>
            <div className="Wrapper">
                <button className="logoutButton" onClick={logout}>Выйти</button>
                <div>
                    {exercises.map((ex) =>
                        <div key={ex.id}>
                            <h1><Link to={'/exercise/' + ex.id}>{ex.title}</Link></h1>
                        </div>)}
                </div>
                <div>
                    <Route exact path="/exercise/:id" component={Exercise} />
                </div>
            </div>
            <Launcher
                agentProfile={{
                    teamName: 'Чат'
                }}
                onMessageWasSent={sendMessage}
                messageList={messages}
                showEmoji={false}
                mute={true}
            />
        </BrowserRouter>
    );
}

const sendMessage = m => {
    let auth = JSON.parse(localStorage.getItem('auth'))
    let message = {};
    message.text = m.data.text
    message.timestamp = Date.now()
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