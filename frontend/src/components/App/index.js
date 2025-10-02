import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "../Login";
import EmployeeDashboard from "../Dashboard/Employees";
import DepartmentsDashboard from "../Dashboard/Departments";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
  }, []);

  return (
    <>
      {/* {isAuthenticated ? ( */}
        <BrowserRouter>
          <Routes>
          <Route path="/crud-app" element={<Navigate to="/employees" />} />
            <Route path="/" element={<Navigate to="/employees" />} />
            <Route
              path="/employees"
              element={
                <EmployeeDashboard setIsAuthenticated={setIsAuthenticated} />
              }
            />
            <Route
              path="/departments"
              element={
                <DepartmentsDashboard setIsAuthenticated={setIsAuthenticated} />
              }
            />
          </Routes>
        </BrowserRouter>
      {/* ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )} */}
    </>
  );
};

export default App;
