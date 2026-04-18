import React from "react";

const UserTable = props => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Név</th>
        <th>Felhasználónév</th>
        <th>Műveletek</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>
              <button onClick={() => {props.editRow(user);}} className="button btn btn-primary">Szerkesztés</button>
              <button onClick={() => props.deleteUser(user.id)} className="button btn btn-danger">Törlés</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>Nincs felhasználó</td>
        </tr>
      )}
    </tbody>
  </table>
);
export default UserTable;