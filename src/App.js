import React, {useState, useEffect} from 'react';
import './App.css';


function App() {

const [users, setUsers] = useState([])


const onSubmit = e => {
  e.preventDefault();
  const data = new FormData(e.target);
  var object = {};
  data.forEach((value, key) => {object[key] = value});
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  });
}

useEffect(() => {
  let eventSource = new EventSource('http://localhost:8080/api/users')
    eventSource.onmessage = e => {
        const parsedData = JSON.parse(e.data);
        setUsers((user) => users.concat(parsedData));
    }}, [users]);


  return (
    <form onSubmit={onSubmit} action="/api/register" method="post">
      <label for="name">Имя</label>
      <input type="text" name="name"/>
      <br/>
      <label for="surname">Фамилия</label>
      <input type="text" name="surname"/>
      <br/>
      <br/>
      <label for="grade">Класс</label>
      <input type="text" name="grade"/>
      <button>Отправить</button>
    {users.map((user) => <p>{user.name}  {user.surname}  {user.grade}</p>)}
    </form>
  );
}
export default App
