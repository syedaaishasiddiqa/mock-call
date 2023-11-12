// src/AddMockCall.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddMockCall = ({ addCall, editingCall, updateCall }) => {
  const [studentName, setStudentName] = useState('');
  const [duration, setDuration] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [durationError, setDurationError] = useState('');
  const [studentNameError, setStudentNameError] = useState('');

  useEffect(() => {
    if (editingCall) {
      setStudentName(editingCall.studentName);
      setDuration(editingCall.duration.toString());
      setDateTime(new Date(editingCall.dateTime));
    } else {
      setStudentName('');
      setDuration('');
      setDateTime(new Date());
    }
  }, [editingCall]);

  const handleAddCall = () => {
    if (studentName.trim() !== '' && duration.trim() !== '') {
      const parsedDuration = parseInt(duration, 10);

      if (!isNaN(parsedDuration) && isString(studentName)) {
        const newCall = {
          studentName,
          duration: parsedDuration,
          dateTime: dateTime.toLocaleString(),
        };

        if (editingCall) {
          // If it's an existing call, just update it
          updateCall(editingCall.index, newCall);
        } else {
          // If it's a new call, add it to the list and update the count
          addCall(newCall);
        }

        setStudentName('');        
        setDuration('');
        setDateTime(new Date());
        setDurationError('');
        setStudentNameError('');
      } else {
        if (!isString(studentName)) {
          setStudentNameError('Please enter a valid name.');
        }

        if (isNaN(parsedDuration)) {
          setDurationError('Please enter a valid integer for duration.');
        }
      }
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDurationChange = (e) => {
    const inputVal = e.target.value.replace(/\D/g, '');
    setDuration(inputVal);
    setDurationError('');
  };
  const isString = (value) => {
    // Perform a case-insensitive comparison
    return /^[A-Za-z\s]+$/i.test(value);
  };
  

  

  return (
    <div>
      <h2>{editingCall ? 'Edit Mock Call' : 'Add Mock Call'}</h2>
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => {
          setStudentName(e.target.value);
          setStudentNameError('');
        }}
      />
      {studentNameError && <p style={{ color: 'red' }}>{studentNameError}</p>}
      <input
        type="text"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={handleDurationChange}
      />
      {durationError && <p style={{ color: 'red' }}>{durationError}</p>}
      <DatePicker
        selected={dateTime}
        onChange={(date) => setDateTime(date)}
        minDate={new Date()}
        maxDate={new Date()}
        filterDate={(date) => !isToday(date)}
      />
      <button onClick={handleAddCall}>
        {editingCall ? 'Update Mock Call' : 'Add Mock Call'}
      </button>
    </div>
  );
};

export default AddMockCall;
