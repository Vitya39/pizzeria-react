import React, { useState} from "react";

const AddUserForm = props => {
  const initialFormState = { id: null, name: "", username: "" };
  const [user, setUser] = useState(initialFormState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const resetAddUser = () => {
    props.setEditing(false);
    setUser(initialFormState);
    props.setCurrentUser(initialFormState);
  };
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!user.name || !user.username) return;
        props.addUser(user);
        resetAddUser();
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} className="form-control"/>
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} className="form-control"/>
      <button className="btn btn-primary">Add user</button>
    </form>
  );
};
export default AddUserForm;
