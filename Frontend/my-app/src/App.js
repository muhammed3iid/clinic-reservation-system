import React, { useState } from "react";
import Login from "./Login";
//import ClinicReservationPage from "./ClinicReservationPage";
import ClinicResrvationPage_patient from "./ClinicResrvationPage_patient";

function App() {
  const [currentPage, setCurrentPage] = useState("login"); // Initialize to 'login'

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === "login" && <Login navigateTo={navigateTo} />}
      {currentPage === "clinic-reservation" && <ClinicResrvationPage_patient/>}
    </div>
  );
}

export default App;
