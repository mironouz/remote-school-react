import React, {useState, useEffect} from 'react';
import './App.css';

export default function App() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        let eventSource = new EventSource('/api/users')
        eventSource.onmessage = e => {
            const parsedData = JSON.parse(e.data);
            setUsers(users => [parsedData, ...users]);
        }
    }, []);

    return (
        <div className="Wrapper">
            <div className="UserList">
                {users.map((user, i) => <p key={i}>{user.name} {user.surname} {user.grade}</p>)}
            </div>
        </div>
    );
}