//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  // Fetch users from the API and update the state
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users/')
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("There was an an error fetching the users! ", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      {(users.length > 0) ?
        users.map((user) => (
          <div key={user._id}>
            <br/>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
          </div>
        )) : (
          <p>No users found.</p>  // Display a message if no users are found
        )}
    </div>
  );
}

export default App;
