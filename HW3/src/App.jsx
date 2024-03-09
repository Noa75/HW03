import React, { useState } from 'react';
import FCRegister from './FuncComps/FCRegister';
import FCLogin from './FuncComps/FCLogIn';
import Profile from './FuncComps/FCProfile';
import SystemAdmin from './FuncComps/SystemAdmin';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (credentials) => {
    
    if (credentials.username === 'admin' && credentials.password === 'ad12343211ad') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      
    } else {
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === credentials.username && u.password === credentials.password);

      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        setIsAdmin(false); 
      } else {
        alert('Invalid username or password.');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsAdmin(false);
    sessionStorage.removeItem('currentUser');
  };

  const updateUserDetails = (updatedUser) => {
    setCurrentUser(updatedUser);
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="App" style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', padding: '100px', width: '100%'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FCRegister />
        <FCLogin onLoginSuccess={handleLogin} />
      </div>

      {isLoggedIn && !isAdmin && (
        <Profile user={currentUser} onLogout={handleLogout} onUserUpdate={updateUserDetails} />
      )}

      {isLoggedIn && isAdmin && (
        <SystemAdmin onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
