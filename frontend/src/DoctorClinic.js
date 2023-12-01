import React, { useState, useEffect } from "react";
import './Style/Clinic.css'
import { useHistory } from "react-router-dom";

const DoctorClinic = () => {
  const [role] = useState("Doctor");
  const [schedule, setSchedule] = useState([]);
  const [slot, setSlot] = useState({ date: '', hour: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();
  const { username } = history.location.state;

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/doctor_view_slots/?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const scheduleData = responseData.object;
        setSchedule(scheduleData);
      } else {
        console.error("Failed to fetch schedule data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSchedule();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const addSlot = async () => {
    if (slot.date && slot.time) {
      const data = {
        username: username,
        date: slot.date,
        time: slot.time,
      };
      try {
        const response = await fetch("http://localhost:8000/insert_slot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.status) {
            setSchedule((prevSchedule) => [...prevSchedule, slot]);
            setSlot({ date: "", time: ""});
            setSuccessMessage("Appointment reserved successfully ✅");
          } else {
            console.error(
              "Failed to reserve appointment:",
              responseData.message
            );
          }
        } else {
          console.error("Failed to reserve appointment");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Hello, {role} {username}</h2>
      <br/>
      <h3>My Slots</h3>
      <br/>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot, index) => (
            <tr key={index}>
              <td>{slot.date}</td>
              <td>{slot.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <h3>Create new slot</h3>
        <div className="submit">
          <input
            type="date"
            placeholder="date"
            value={slot.date}
            onChange={(e) => setSlot({ ...slot, date: e.target.value })}
          />
          <input
            type="time"
            placeholder="time"
            value={slot.time}
            onChange={(e) => setSlot({ ...slot, time: e.target.value })}
          />
          <br/>
          <button onClick={addSlot}>Add slot</button>
        </div>
    </div>
  );
};

export default DoctorClinic;
