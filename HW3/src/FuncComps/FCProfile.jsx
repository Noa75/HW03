import React, { useState, useEffect } from 'react';
import EditDetails from './FCEditDetails'; 

function Profile({ onLogout, onUserUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    setUser(storedUser);
  }, []);

  const handleUserUpdate = (updatedUser) => {
    onUserUpdate(updatedUser);
    setEditMode(false);
    setUser(updatedUser);
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  if (!user) {
    return <p style={{ textAlign: 'center', color: '#ffffff' }}>You need to log in to the system.</p>;
  }

  
  const defaultImagePath = 'vite.svg'; 
console.log(user.picture)
  return (
    <div style={{ padding: '100px', backgroundColor: '#121212', color: '#ffffff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '15px' }}>
        {/* Display the Base64 image or a default image */}
        <img 
          src={user.picture ? user.picture : defaultImagePath} 
          alt="User" 
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} 
        />
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <p>Email: {user.email}</p>
          <p>Address: {`${user.street} ${user.streetNumber}, ${user.city}`}</p>
          <p>Birth Date: {user.birthDate}</p>
        </div>
        <div>
          <button style={{ margin: '10px', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setEditMode(!editMode)}>Edit Details</button>
          <a href="https://games.yo-yoo.co.il/games_play.php?game=345" target="_blank" rel="noopener noreferrer">
            <button style={{ margin: '10px', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>To the Game</button>
          </a>
          <button style={{ margin: '10px', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={onLogout}>Log Out</button>
        </div>
      </div>
      {editMode && <EditDetails user={user} setEditMode={setEditMode} onUserUpdate={handleUserUpdate} />}
    </div>
  );
}

export default Profile;
