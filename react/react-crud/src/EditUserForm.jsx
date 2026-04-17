import React, { useState, useEffect } from "react";

const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.updateUser(user.id, user);
        resetAddUser();
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} class="form-control"/>
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} class="form-control"/>
      <button className="button btn btn-primary">Update user</button>
      <button className="button btn btn-secondary" onClick={() => props.setEditing(false)}>Cancel</button>
    </form>
  );
};
export default EditUserForm;
