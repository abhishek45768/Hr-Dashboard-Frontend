import { useState } from 'react';
import Layout from '../component/layout/Layout';
import '../styles/Attendence.css';

const Attendance = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Jane Copper',
      avatar: '/assets/images/avatar-1.jpg',
      position: 'Full Time',
      department: 'Designer',
      task: 'Dashboard Home page Alignment',
      status: 'Present'
    },
    {
      id: 2,
      name: 'Arlene McCoy',
      avatar: '/assets/images/avatar-2.jpg',
      position: 'Full Time',
      department: 'Designer',
      task: 'Dashboard Login page design, Dashboard Home page design',
      status: 'Present'
    },
    {
      id: 3,
      name: 'Cody Fisher',
      avatar: '/assets/images/avatar-3.jpg',
      position: 'Senior',
      department: 'Backend Development',
      task: '--',
      status: 'Absent'
    },
    {
      id: 4,
      name: 'Janney Wilson',
      avatar: '/assets/images/avatar-4.jpg',
      position: 'Junior',
      department: 'Backend Development',
      task: 'Dashboard login page integration',
      status: 'Present'
    },
    {
      id: 5,
      name: 'Leslie Alexander',
      avatar: '/assets/images/avatar-5.jpg',
      position: 'Team Lead',
      department: 'Human Resource',
      task: '4 scheduled interview, Sorting of resumes',
      status: 'Present'
    }
  ]);

  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const toggleActionMenu = (id) => {
    if (actionMenuOpen === id) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(id);
    }
  };

  return (
    <Layout title="Attendance">
      <div className="attendance-container">
        <div className="filters-container">
          <div className="filter">
            <div className="filter-dropdown">
              <span>Status</span>
              <span className="dropdown-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          </div>
          <div className="search-box">
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="attendance-table">
          <div className="table-header">
            <div className="header-cell profile">Profile</div>
            <div className="header-cell employee-name">Employee Name</div>
            <div className="header-cell position">Position</div>
            <div className="header-cell department">Department</div>
            <div className="header-cell task">Task</div>
            <div className="header-cell status">Status</div>
            <div className="header-cell action">Action</div>
          </div>
          <div className="table-body">
            {employees.map((employee) => (
              <div className="table-row" key={employee.id}>
                <div className="cell profile">
                  <div className="avatar">
                    <img src={employee.avatar || '/assets/images/avatar-placeholder.jpg'} alt={employee.name} />
                  </div>
                </div>
                <div className="cell employee-name">{employee.name}</div>
                <div className="cell position">{employee.position}</div>
                <div className="cell department">{employee.department}</div>
                <div className="cell task">{employee.task}</div>
                <div className="cell status">
                  <div className={`status-badge ${employee.status.toLowerCase()}`}>
                    {employee.status}
                    <span className="dropdown-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="cell action">
                  <div className="action-menu-container">
                    <button className="action-btn" onClick={() => toggleActionMenu(employee.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>
                    {actionMenuOpen === employee.id && (
                      <div className="action-menu">
                        <div className="action-item">
                          View Details
                        </div>
                        <div className="action-item">
                          Edit Attendance
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;