import React, {useState, useEffect} from 'react';
import './App.css';


function App() {

    const [users, setUsers] = useState([])


    const onSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        let object = {};
        data.forEach((value, key) => {
            object[key] = value
        });
        fetch('http://140.82.38.236:8081/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });
    }

    useEffect(() => {
        let eventSource = new EventSource('http://140.82.38.236:8081/api/users')
        eventSource.onmessage = e => {
            const parsedData = JSON.parse(e.data);
            setUsers(users => [parsedData, ...users]);
        }
    }, []);


    return (
        <div className="Wrapper">
            <form className="RegistrationForm" onSubmit={onSubmit}>
                <label htmlFor="name">Имя</label><br/>
                <input type="text" name="name" id="name"/><br/>
                <label htmlFor="surname">Фамилия</label><br/>
                <input type="text" name="surname" id="surname"/><br/>
                <label htmlFor="grade">Класс</label><br/>
                <select name="grade" id="grade">
                    <option value="FIFTH">Пятый</option>
                    <option value="SIXTH">Шестой</option>
                </select>
                <br/>
                <button>Отправить</button>
            </form>
            <div className="UserList">
                {users.map((user, i) => <p key={i}>{user.name} {user.surname} {user.grade}</p>)}
            </div>
        </div>
    );
}

export default App
