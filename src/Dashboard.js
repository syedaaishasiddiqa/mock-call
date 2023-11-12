// src/Dashboard.js
import React, { useState } from 'react';
import AdminPanel from './AdminPanel';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';

const Dashboard = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div>
      <h1>Mock Call Monitoring App</h1>
      {showSignUp ? (
        <SignUp />
      ) : (
        <>
          <button onClick={() => setShowSignUp(true)}>Sign Up</button>
          <AdminPanel />
        </>
      )}
      <ConfirmSignUp />
    </div>
  );
};

export default Dashboard;
