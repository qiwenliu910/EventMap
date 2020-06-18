import React, { useState } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Login from './components/loginComponents/Login'


function  App(){
  const [currentUser, setCurrentUser] = useState(
    {
      id: 0,
      username: "default",
      password: "default"
    })
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "user",
      password: "user"
    },
    {
      id: 2,
      username: "user2",
      password: "user2"
    },
    {
      id: 3,
      username: "user3",
      password: "user3"
    }
  ])
  console.log(currentUser)
  return (
      <div className="App">
        <Header/>
        <Login
          users={users}
          setCurrentUser={setCurrentUser}
        />
      </div>
    );
}

export default App;
