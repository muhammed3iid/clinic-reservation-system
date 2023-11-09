import React, { useState } from "react";
import './Style/Clinic.css'
const ClinicReservationPage_patient = () => {
  const [userType] = useState('patient');
  const [schedule, setSchedule] = useState([
    { date: '2023-11-01', hour: '09:00 AM', doctor: 'Dr. Smith' },
    { date: '2023-11-02', hour: '02:30 PM', doctor: 'Dr. Johnson' },
  ]);
  const [newAppointment, setNewAppointment] = useState({ date: '', hour: '', doctor: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const createAppointment = () => {
    // Add your logic to create a new appointment
    if (newAppointment.date && newAppointment.hour && newAppointment.doctor) {
      setSchedule([...schedule, newAppointment]);
      setNewAppointment({ date: '', hour: '', doctor: '' });
      setSuccessMessage('Appointment reserved successfully ✅');
    }
  };

  return (
    <div>
      <p>Hello, User (user type: {userType})</p>

      <h2>My Appointments</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hour</th>
            <th>Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.date}</td>
              <td>{appointment.hour}</td>
              <td>{appointment.doctor}</td>
              <td>
                <button onClick={() => console.log('Edit appointment', appointment)}>
                  Edit
                </button>
                <button onClick={() => console.log('Cancel appointment', appointment)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Create New Appointment</h2>
        <div>
          <input
            type="date"
            placeholder="Date"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
          />
          <input
            type="time"
            placeholder="Hour"
            value={newAppointment.hour}
            onChange={(e) => setNewAppointment({ ...newAppointment, hour: e.target.value })}
          />
          <select
            value={newAppointment.doctor}
            onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
          >
            <option value="">Select a doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            {/* Add more doctors here */}
          </select>
          <button onClick={createAppointment}>Reserve</button>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ClinicReservationPage_patient;
