// src/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import MockCallList from './MockCallList';
import AddMockCall from './AddMockCall';

const AdminPanel = () => {
  const [mockCalls, setMockCalls] = useState([]);
  const [user, setUser] = useState(null);
  const [editingCall, setEditingCall] = useState(null);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const addCall = (newCall) => {
    setMockCalls([...mockCalls, newCall]);
  };

  const editCall = (index) => {
    setEditingCall({ ...mockCalls[index], index });
  };

  const updateCall = (index, updatedCall) => {
    const updatedCalls = [...mockCalls];
    updatedCalls[index] = updatedCall;
    setMockCalls(updatedCalls);
    setEditingCall(null);
  };

  const deleteCall = (index) => {
    const updatedCalls = mockCalls.filter((_, i) => i !== index);
    setMockCalls(updatedCalls);
    setEditingCall(null);
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSetRemarks = (remarks) => {
    setRemarks(remarks);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {user && user.signInUserSession.idToken.payload['cognito:groups'] &&
        user.signInUserSession.idToken.payload['cognito:groups'].includes('Admin') && (
          <>
            <p>Welcome, {user.username}!</p>
            <button onClick={handleSignOut}>Sign Out</button>
            <AddMockCall
              addCall={addCall}
              editingCall={editingCall}
              updateCall={updateCall}
              setRemarks={handleSetRemarks}
            />
            <MockCallList
              calls={mockCalls}
              editCall={editCall}
              deleteCall={deleteCall}
              remarks={remarks}
            />
          </>
        )}
    </div>
  );
};

export default AdminPanel;
