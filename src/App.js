// src//App.js
import React, { useState } from 'react';
import MockCallList from './MockCallList';
import AddMockCall from './AddMockCall';

function App() {
  const [mockCalls, setMockCalls] = useState([]);
  const [editingCall, setEditingCall] = useState(null);

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

  return (

    <div>
      <h1>Mock Call Monitoring App</h1>
      <AddMockCall
        addCall={addCall}
        editingCall={editingCall}
        updateCall={updateCall}
      />
      <MockCallList
        calls={mockCalls}
        editCall={editCall}
        deleteCall={deleteCall}
      />
    </div>

  );
}

export default App;