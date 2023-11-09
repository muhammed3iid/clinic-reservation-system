import React, { useState } from "react";
import './Style/Clinic.css'
const ClinicReservationPage = () => {
  const [userType] = useState('doctor');
  const [schedule, setSchedule] = useState([
    { date: '2023-11-01', hour: '09:00 AM' },
    { date: '2023-11-02', hour: '02:30 PM' },
    // Add more schedule entries here
  ]);
  const [newSlot, setNewSlot] = useState({ date: '', hour: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const editSlot = (index) => {
    // Add your edit slot logic here
    console.log(`Edit slot at index ${index}`);
  };

  const cancelSlot = (index) => {
    // Add your cancel slot logic here
    console.log(`Cancel slot at index ${index}`);
  };

  const addSlot = () => {
    // Add your logic to add a new slot to the schedule
    if (newSlot.date && newSlot.hour) {
      setSchedule([...schedule, newSlot]);
      setNewSlot({ date: '', hour: '' });
      setSuccessMessage('Slot added successfully ✅');
    }
  };

  return (
    <div>
      <p>Hello, User (user type: {userType})</p>

      <h2>My Slots</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot, index) => (
            <tr key={index}>
              <td>{slot.date}</td>
              <td>{slot.hour}</td>
              <td>
                <button onClick={() => editSlot(index)}>Edit</button>
                <button onClick={() => cancelSlot(index)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Create New Slot</h2>
        <div>
          <input
            type="date"
            placeholder="Date"
            value={newSlot.date}
            onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
          />
          <input
            type="time"
            placeholder="Hour"
            value={newSlot.hour}
            onChange={(e) => setNewSlot({ ...newSlot, hour: e.target.value })}
          />
          <button onClick={addSlot}>Add Slot</button>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ClinicReservationPage;
