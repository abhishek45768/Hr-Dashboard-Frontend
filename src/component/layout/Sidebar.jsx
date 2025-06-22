import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Sidebar.css";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
const [wantlogout,setwantlogout]=useState(false)
  const navigate = useNavigate();
const  handlelogout=async()=>{
  Cookies.remove("token");
  navigate('/login')
}
  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">LOGO</div>
      </div>
      <div className="search-container">
        <div className="search-bar">
          <span className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input type="text" className="search-input" placeholder="Search" />
        </div>
      </div>

      <div className="sidebar-sections">
        <div className="section-title">Recruitment</div>
        <div
          className={`menu-option sidebar-item ${
            path.includes("/candidates") ? "active" : ""
          }`}
        >
         { path.includes("/candidates")&& <div className="selector"></div>}
          <span className="sidebar-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 72 72"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 33H24M16.5 40.5V25.5M43.5 42C54.8899 42 60.6914 46.0121 62.4279 54.0364C63.1287 57.2751 60.3137 60 57 60H30C26.6863 60 23.8713 57.2752 24.5721 54.0364C26.3086 46.0121 32.1101 42 43.5 42ZM43.5 30C48.5 30 51 27.4286 51 21C51 14.5714 48.5 12 43.5 12C38.5 12 36 14.5714 36 21C36 27.4286 38.5 30 43.5 30Z" />
            </svg>
          </span>

          <Link className="menu-option" to="/candidates">
            Candidates
          </Link>
        </div>

        <div className="section-title">Organization</div>
        <div
          className={`menu-option sidebar-item ${
            path.includes("/employees") ? "active" : ""
          }`}
        >
            { path.includes("/employees")&& <div className="selector"></div>}
          <span className="sidebar-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          <Link className="menu-option" to="/employees">
            Employees
          </Link>
        </div>

        <div
          className={`menu-option sidebar-item ${
            path.includes("/attendance") ? "active" : ""
          }`}
        >
           { path.includes("/attendance")&& <div className="selector"></div>}
          <span className="sidebar-icon">
            <span className="sidebar-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V11Z" />
                <path d="M4 15C4 14.4477 4.44772 14 5 14H7C7.55228 14 8 14.4477 8 15V19C8 19.5523 7.55228 20 7 20H5C4.44772 20 4 19.5523 4 19V15Z" />
                <path d="M16 7C16 6.44772 16.4477 6 17 6H19C19.5523 6 20 6.44772 20 7V19C20 19.5523 19.5523 20 19 20H17C16.4477 20 16 19.5523 16 19V7Z" />
              </svg>
            </span>
          </span>
          <Link
            className="menu-option"
            style={{ marginLeft: "-13px" }}
            to="/attendance"
          >
            Attendance
          </Link>
        </div>

        <div
          className={`menu-option sidebar-item ${
            path.includes("/leaves") ? "active" : ""
          }`}
        >
                     { path.includes("/leaves")&& <div className="selector"></div>}
          <span className="sidebar-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 4C10 7.31371 7.31371 10 4 10C7.31371 10 10 12.6863 10 16C10 12.6863 12.6863 10 16 10C12.6863 10 10 7.31371 10 4Z" />
              <path d="M17.5 15C17.5 16.3807 16.3807 17.5 15 17.5C16.3807 17.5 17.5 18.6193 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5C18.6193 17.5 17.5 16.3807 17.5 15Z" />
            </svg>
          </span>

          <Link className="menu-option" to="/leaves">
            Leaves
          </Link>
        </div>

        <div className="section-title">Others</div>
        <div
          className={`menu-option sidebar-item `}
          style={{ cursor: "pointer" }}
          onClick={()=>{setwantlogout(true)}}
        >
          <span className="sidebar-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </span>
          Logout
        </div>
     {wantlogout &&  <div class="modal-overlay">
  <div class="logout-modal">
    <div class="logout-header">Log Out</div>
    <div class="logout-body">
      <p>Are you sure you want to log out?</p>
      <div class="logout-buttons">
        <button class="cancel-btn" onClick={()=>{setwantlogout(false)}}>Cancel</button>
        <button class="logout-btn" onClick={()=>{handlelogout()}}>Logout</button>
      </div>
    </div>
  </div>
</div>
}

      </div>
    </div>
  );
};

export default Sidebar;
