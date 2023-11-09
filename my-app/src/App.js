import React, { useState } from "react";
import Authentication from "./Authentication";
import ClinicReservationPage_patient from "./ClinicReservationPage_patient";

function App() {
  const [currentPage, setCurrentPage] = useState("Authentication");

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === "Authentication" && <Authentication navigateTo={navigateTo} />}
      {currentPage === "clinic-reservation" && <ClinicReservationPage_patient/>}
    </div>
  );
}

export default App;
