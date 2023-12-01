import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Authentication from "./Authentication";
import DoctorClinic from "./DoctorClinic";
import PatientClinic from "./PatientClinic";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Authentication}/>
        <Route path="/DoctorClinic" component={DoctorClinic}/>
        <Route path="/PatientClinic" component={PatientClinic}/>
      </Switch>
    </Router>
  );
}

export default App;
