import React, { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";


function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };


  const handleRemove = (id) => {
    const updatedUsers = usersList.filter((user) => user.id !== id);
    setUsersList(updatedUsers);
  };


  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList onRemoveUser={handleRemove} users={usersList} />
    </div>
  );
}

export default App;
