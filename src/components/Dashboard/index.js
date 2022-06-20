import React, {useEffect, useState} from 'react'
import './style.css'
import 'eventsource/example/eventsource-polyfill'
import {Launcher} from 'react-chat-window'
import Exercise from "../Exercise"
import {getAuth} from "../../services/utils";
import {logout, sendMessage} from "./lib/helpers";

export default function Dashboard() {
    const [messages, setMessages] = useState([])
    const [exercises, setExercises] = useState([])
    const [currentExercise, setCurrentExercise] = useState(0)

    useEffect(() => {
        fetch('/api/exercises', {
            headers: {
                'Authorization': 'Basic ' + getAuth()
            }
        })
        .then(response => response.json())
        .then(exercises => setExercises(exercises))

        const eventSource = new window.EventSourcePolyfill('/api/messages', {
                headers: {
                    'Authorization': 'Basic ' + getAuth()
                }})

        eventSource.onmessage = e => {
            if (e.data !== "heartbeat") {
                const data = JSON.parse(e.data);
                const text = `${data.timestamp}\n${data.user.name} ${data.user.surname}\n${data.text}`
                const message = {author: 'them', data: {text: text}, type: 'text'}
                setMessages(messages => messages.concat(message))
            }
        }
        return () => eventSource.close()
    }, []);

    return (
        <div>
            <div className="Wrapper">
                <button className="logoutButton" onClick={logout}>Выйти</button>
                <div>
                    {exercises.map((ex) =>
                        <div key={ex.id}>
                            <h1><button onClick={setCurrentExercise.bind(this, ex.id)}>{ex.title}</button></h1>
                        </div>)}
                </div>
                <div>
                    <Exercise id={currentExercise}/>
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
        </div>
    );
}