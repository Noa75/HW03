import React, { useState, useEffect } from 'react';
import EditDetails from './FCEditDetails';

function SystemAdmin({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  const deleteUser = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map(user => user.email === updatedUser.email ? updatedUser : user);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    marginTop: '20px',
  };

  const thStyle = {
    background: '#007bff',
    color: '#ffffff',
    padding: '10px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const pictureStyle = {
    width: '50px', 
    height: '50px', 
    borderRadius: '50%', 
    objectFit: 'cover', 
  };

  const buttonStyle = {
    marginRight: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={onLogout} style={buttonStyle}>Logout</button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Picture</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Full Name</th>
            <th style={thStyle}>Birth Date</th>
            <th style={thStyle}>Full Address</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={tdStyle}>
                <img src={user.picture || 'defaultUserImage.png'} alt="User" style={pictureStyle} onError={(e) => e.target.src = 'defaultUserImage.png'} />
              </td>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{`${user.firstName} ${user.lastName}`}</td>
              <td style={tdStyle}>{user.birthDate}</td>
              <td style={tdStyle}>{`${user.street} ${user.streetNumber}, ${user.city}`}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                <button style={{ ...buttonStyle, backgroundColor: '#28a745' }} onClick={() => handleEditClick(user)}>Edit</button>
                <button style={{ ...buttonStyle, backgroundColor: '#dc3545' }} onClick={() => deleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && <EditDetails user={editingUser} setEditMode={setEditingUser} onUserUpdate={handleUpdateUser} />}
    </div>
  );
}

export default SystemAdmin;
