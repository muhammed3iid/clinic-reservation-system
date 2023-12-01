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
  const [editIndex, setEditIndex] = useState(null);

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/view_slots/?username=${username}`,
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
      const response = await fetch("http://localhost:8000/get_doctors");
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
        const response = await fetch("http://localhost:8000/choose_slot/", {
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
      const response = await fetch("http://localhost:8000/delete_slot/", {
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

  const openEditModal = (index) => {
    setEditIndex(index);
    const appointmentToEdit = schedule[index];
    setSlot({
      date: appointmentToEdit.date,
      time: appointmentToEdit.time,
      doctor: appointmentToEdit.doctor,
    });
  };

  const closeEditModal = () => {
    setEditIndex(null);
    setSlot({ date: "", time: "", doctor: "" });
  };

  const updateSlot = async () => {
    if (slot.date && slot.time && slot.doctor) {
      const data = {
        username: username,
        doctor: slot.doctor,
        date: slot.date,
        time: slot.time,
      };
      try {
        const response = await fetch("http://localhost:8000/update_slot/", {
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
            const updatedSchedule = [...schedule];
            updatedSchedule[editIndex] = slot;
            setSchedule(updatedSchedule);
            closeEditModal();
          } else {
            console.error("Failed to edit appointment:", responseData.message);
          }
        } else {
          console.error("Failed to edit appointment");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Hello, {role} {username}</h2>
      <h3>My slots</h3>
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
                <button className="tbuttons" onClick={() => openEditModal(index)}>Edit</button>
                <button className="tbuttons" onClick={() => deleteSlot(index)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit Modal */}
      {editIndex !== null && (
        <div className="edit-modal">
          <h3>Edit appointment</h3>
          <div>
            <input
              type="date"
              placeholder="Date"
              value={slot.date}
              onChange={(e) => setSlot({ ...slot, date: e.target.value })}
            />
            <input
              type="time"
              placeholder="Time"
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
            <br/>
            <button className="editbttn" onClick={updateSlot}>Update</button>
            <button className="editbttn"onClick={closeEditModal}>Cancel</button>
          </div>
        </div>
      )}
      <div>
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
          <select
            
            value={slot.doctor}
            onChange={(e) => setSlot({ ...slot, doctor: e.target.value })}
          >
            <option value= "">Select doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.username} value={doctor.username}>
                {doctor.username}
              </option>
            ))}
          </select>
          <br/>
          <button onClick={createSlot}>Reserve</button>
        </div>
      </div>
    </div>
  );
};

export default PatientClinic;
