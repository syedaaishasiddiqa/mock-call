// src/MockCallList.js
import React from 'react';

const MockCallList = ({ calls, editCall, deleteCall }) => {
  <div>
  <h2>Mock Call List</h2>
  {/* Add some content here */}
</div>
  // Create a map to store the count of calls taken by each candidate in a day
  const callsPerDay = {};

  // Iterate through the calls to update the count
  calls.forEach((call) => {
    const key = `${call.studentName}-${call.dateTime.split(',')[0]}`;
    callsPerDay[key] = callsPerDay[key] ? callsPerDay[key] + 1 : 1;
  });

  return (
    <div>
      <h2>Mock Call List</h2>
      <ul>
        {calls.map((call, index) => (
          <li key={index}>
            Student: {call.studentName} | Duration: {call.duration} minutes |{' '}
            Date and Time: {call.dateTime} | Calls Taken Today: {callsPerDay[`${call.studentName}-${call.dateTime.split(',')[0]}`]}
            <button onClick={() => editCall(index)}>Edit</button>
            <button onClick={() => deleteCall(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MockCallList;
