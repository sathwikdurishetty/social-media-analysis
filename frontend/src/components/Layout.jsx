import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PenSquare, 
  Database, 
  Calculator, 
  LineChart, 
  PieChart, 
  HelpCircle,
  FileText,
  Info,
  Play
} from 'lucide-react';
import { generateSampleData } from '../api';

const Layout = () => {
  const navigate = useNavigate();
  
  const handleLoadSample = async () => {
    if(window.confirm('This will overwrite current data with 30 days of sample data. Proceed?')) {
      await generateSampleData();
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-title">
          Math Analytics
        </div>
        
        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/entry" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <PenSquare size={20} /> Data Entry
          </NavLink>
          <NavLink to="/dataset" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Database size={20} /> Dataset
          </NavLink>
          <NavLink to="/math" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Calculator size={20} /> Math Analysis
          </NavLink>
          <NavLink to="/correlation" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <LineChart size={20} /> Correlation & Reg.
          </NavLink>
          <NavLink to="/charts" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <PieChart size={20} /> Charts
          </NavLink>
          <NavLink to="/whatif" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <HelpCircle size={20} /> What-If Analysis
          </NavLink>
          <NavLink to="/report" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <FileText size={20} /> Report
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Info size={20} /> About Project
          </NavLink>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem' }} onClick={handleLoadSample}>
            <Play size={16} /> Load Sample Data
          </button>
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
