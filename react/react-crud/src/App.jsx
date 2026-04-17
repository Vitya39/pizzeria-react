import React, { useState } from "react";
import UserTable from "/src/UserTable";
import EditUserForm from "/src/EditUserForm";
import AddUserForm from "/src/AddUserForm";

const App = () => {
  const usersData = [
    { id: 1, name: "NViktor", username: "vity39" },
    { id: 2, name: "BBence", username: "parittyaa" },
    { id: 3, name: "Amon Gus F", username: "amogus" }
  ];
  const [users, setUsers] = useState(usersData);
  const initialFormState = { id: null, name: "", username: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };
  const deleteUser = id => {
    setEditing(false);
    setUsers(users.filter(user => user.id !== id));
  };
  const editRow = user => {
    setEditing(true);
    setCurrentUser(user);
  };
  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className="container">
      <h1>CRUD</h1>
      <div className="flex-row">
        <div className="flex-large">
          <div>
              <h2>{editing ? "Módosítás" : "Felhasználó hozzáadása"}</h2>
              {editing ? (
                <EditUserForm
                  editing={editing}
                  setEditing={setEditing}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  updateUser={updateUser}
                  addUser={addUser}
                />
              ):(
                <AddUserForm
                  editing={editing}
                  setEditing={setEditing}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  updateUser={updateUser}
                  addUser={addUser}
                />
              )}
          </div>
        </div>
        <div className="flex-large">
          <h2>Felhasználók megtekintése</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};
export default App;
