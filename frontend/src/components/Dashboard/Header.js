import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ backgroundColor: 'lightblue', padding: '20px 60px', borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px"}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: '0', fontSize: '24px', color: '#343a40' }}>HR Management Software</h1>
        <div style={{display:"flex",
                  alignItems: "center",
                  justifyContent: "center",}}>
          <Link to="/employees">
            <button style={{ marginRight: '10px', border: 'none', background: 'none', color: '#343a40', fontSize: '16px', cursor: 'pointer' }}>Employees</button>
          </Link>
          <Link to="/departments">
            <button style={{ marginRight: '10px', border: 'none', background: 'none', color: '#343a40', fontSize: '16px', cursor: 'pointer' }}>Departments</button>
          </Link>
          {/* <Logout setIsAuthenticated={setIsAuthenticated} /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
