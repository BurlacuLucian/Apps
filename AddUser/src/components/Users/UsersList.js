import React from "react";
import Card from "../UI/Card";
import classes from "./UsersList.module.css";
import RemoveButton from "../UI/RemoveButton";

const UsersList = ({users, onRemoveUser}) => {


  return (
    <Card className={classes.users}>
   
      <ul>
        
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)

            <RemoveButton 
              className="button" 
              type="submit" 
              onClick={() => onRemoveUser(user.id)}
            >
              close
            </RemoveButton>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
