import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';

import Login from './pages/login';
import Register from './pages/Register';
import Candidates from './pages/Candidates';
import Employees from './pages/Employees';
import Attendance from './pages/Attendence';
import Leaves from './pages/Leaves';
import PrivateRoute from './utils/ProtectedRoutes';

import './App.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

      
          <Route element={<PrivateRoute />}>
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leaves" element={<Leaves />} />
          </Route>

          
        </Routes>
      </Router>
    </>
  );
};

export default App;
