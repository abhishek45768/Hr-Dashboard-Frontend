import { useEffect, useState } from 'react';
import Layout from '../component/layout/Layout';
import { httpRequest } from '../utils/httpRequest';
import '../styles/Attendence.css';
import { toast } from 'react-toastify';
const Attendance = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [employees, setEmployees] = useState([
   
  ]);

  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const toggleActionMenu = (id) => {
    if (actionMenuOpen === id) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(id);
    }
  };
const [search,setsearch]=useState("")
const [presentstatus,setpresentstatus]=useState("")

    const fetchCandidate = async () => {
        try {
            const response = await httpRequest(
                `api/employees/getEmployees`,
                "get",
                {},
                {search,presentstatus},
                true,
                false
            );
            console.log("response : ", response)

            if (response.success) {
                setEmployees(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
      fetchCandidate()
    },[presentstatus,search])
     const handlestatuschange = async (id, status) => {
        try {
          const response = await httpRequest(
            `api/employees/updateAttendenceStatus/${id}`,
            "patch",
            {
              status,
            },
            {},
            true,
            false
          );
          if (response) {
            toast.success("Status Updated!");
            fetchCandidate();
          }
        } catch (error) {}
      };
  return (
    <Layout title="Attendance">
      <div className="attendance-container">
        <div className="filters-container">
          <div className="filter" >
              <select
              style={{width:"160px"}}
                value={presentstatus}
                onChange={(e) => setpresentstatus(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">All Status</option>
              
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          <div className="search-box">
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input type="text" value={search} onChange={(e)=>{setsearch(e.target.value)}} placeholder="Search" />
          </div>
        </div>

        <div className="attendance-table">
  {/* Table Header */}
  <div
    className="table-header"
    style={{ display: 'flex' }}
  >
    <div className="header-cell employee-name" style={{ width: '16.66%' }}>Employee Name</div>
    <div className="header-cell position" style={{ width: '16.66%' }}>Position</div>
    <div className="header-cell department" style={{ width: '16.66%' }}>Department</div>
    <div className="header-cell task" style={{ width: '16.66%' }}>Task</div>
    <div className="header-cell status" style={{ width: '16.66%' }}>Status</div>
    <div className="header-cell action" style={{ width: '16.66%' }}>Action</div>
  </div>

  {/* Table Body */}
  <div className="table-body">
    {employees.map((employee) => (
      <div
        className="table-row"
        key={employee.id}
        style={{ display: 'flex' }}
      >
        <div className="cell employee-name" style={{ width: '16.66%' }}>{employee.fullName}</div>
        <div className="cell position" style={{ width: '16.66%' }}>{employee.position}</div>
        <div className="cell department" style={{ width: '16.66%' }}>{employee.department}</div>
        <div className="cell task" style={{ width: '16.66%' }}>Dashboard Home Page Alignement</div>
        <div className="cell status" style={{ width: '16.66%' }}>
          <select
            value={employee.present_status}
            onChange={(e) => handlestatuschange(employee._id, e.target.value)}
            className={`status-badge ${employee.present_status.toLowerCase()}`}
          >
            <option value={employee.present_status}>{employee.present_status}</option>
            {["Present", "Absent"]
              .filter((present_status) => present_status !== employee.present_status)
              .map((present_status) => (
                <option key={present_status} value={present_status}>
                  {present_status}
                </option>
              ))}
          </select>
        </div>
        <div className="cell action" style={{ width: '16.66%' }}>
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
                <div className="action-item">View Details</div>
                <div className="action-item">Edit Attendance</div>
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