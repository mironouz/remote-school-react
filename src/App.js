import React, {useState, useEffect} from 'react';
import './App.css';
import 'eventsource/example/eventsource-polyfill'

export default function App() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'))
        let eventSource = new window.EventSourcePolyfill('/api/users', {
            headers: {
                'Authorization': 'Basic ' + user.auth
            }})
        eventSource.onmessage = e => {
            const parsedData = JSON.parse(e.data);
            setUsers(users => [parsedData, ...users]);
        }
    }, []);

    return (
        <div className="Wrapper">
            <p>Messages:</p>
            <div className="UserList">
                {users.map((user, i) => <p key={i}>{user.name} {user.surname} {user.grade}</p>)}
            </div>
        </div>
    );
}