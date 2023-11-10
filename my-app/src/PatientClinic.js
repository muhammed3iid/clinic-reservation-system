import React, { useState, useEffect } from "react";
import "./Style/Clinic.css";
import { useHistory } from "react-router-dom";

const PatientClinic = () => {
  const history = useHistory();
  const { username } = history.location.state;
  const [role] = useState("Patient");
  const [doctors, setDoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [slot, setSlot] = useState({
    date: "",
    time: "",
    doctor: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/view_slots/?username=${username}`,
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

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get_doctors");
      if (response.ok) {
        const responseData = await response.json();
        const doctorsData = responseData.object;
        setDoctors(doctorsData);
      } else {
        console.error("Failed to fetch doctors data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDoctors();
        await fetchSchedule();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const createSlot = async () => {
    if (slot.date && slot.time && slot.doctor) {
      const data = {
        username: username,
        doctor: slot.doctor,
        date: slot.date,
        time: slot.time,
      };
      try {
        const response = await fetch("http://127.0.0.1:8000/choose_slot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.status) {
            // setSchedule([...schedule, slot]);
            setSchedule((prevSchedule) => [...prevSchedule, slot]);
            // await fetchSchedule();
            setSlot({ date: "", time: "", doctor: "" });
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

  const deleteSlot = async (index) => {
    const appointmentToCancel = schedule[index];
    const data = {
      username: username,
      doctor: appointmentToCancel.doctor,
      date: appointmentToCancel.date,
      time: appointmentToCancel.time,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/delete_slot/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status) {
          console.log("Appointment canceled successfully");
          const updatedSchedule = [...schedule];
          updatedSchedule.splice(index, 1);
          setSchedule(updatedSchedule);
        } else {
          console.error("Failed to cancel appointment:", responseData.message);
        }
      } else {
        console.error("Failed to cancel appointment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editSlot = async (index) => {
    const appointmentToEdit = schedule[index];
    const data = {
      username: username,
      doctor: appointmentToEdit.doctor,
      date: appointmentToEdit.date,
      time: appointmentToEdit.time,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/update_slot/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status) {
          console.log("Appointment edited successfully");
        } else {
          console.error("Failed to edit appointment:", responseData.message);
        }
      } else {
        console.error("Failed to edit appointment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>
        Hello, {username} (user role: {role})
      </p>
      <h2>My Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot, index) => (
            <tr key={index}>
              <td>{slot.date}</td>
              <td>{slot.time}</td>
              <td>{slot.doctor}</td>
              <td>
                <button onClick={() => editSlot(index)}>edit</button>
                <button onClick={() => deleteSlot(index)}>Cancel</button>
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
            value={slot.date}
            onChange={(e) => setSlot({ ...slot, date: e.target.value })}
          />
          <input
            type="time"
            placeholder="time"
            value={slot.time}
            onChange={(e) => setSlot({ ...slot, time: e.target.value })}
          />
          <select
            value={slot.doctor}
            onChange={(e) => setSlot({ ...slot, doctor: e.target.value })}
          >
            {doctors.map((doctor) => (
              <option key={doctor.username} value={doctor.username}>
                {doctor.username}
              </option>
            ))}
          </select>
          <button onClick={createSlot}>Reserve</button>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default PatientClinic;
