import { MoreVertical, Edit, Edit2, Trash2 } from "react-feather"
import EditEmployeeModal from "./EditEmployeeModal"
import "../../styles/Employees.css"
import { useState } from "react"
import moment from 'moment'

const EmployeesList = ({ employees, deleteEmployee, onSuccess }) => {
  const baseUrl = import.meta.env.VITE_Backend_Url
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [activeMenu, setActiveMenu] = useState(null)
  const [id, setId] = useState('')
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const toggleActionMenu = (id) => {
    if (actionMenuOpen === id) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(id);
    }
  };
 

  const handleClickOutside = () => {
    setActiveMenu(null)
  }

  // const handleEditEmployee = (updatedEmployee) => {
  //   setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)))
  //   setEditingEmployee(null)
  // }

  // const handlePositionChange = (position) => {
  //   setSelectedPosition(position)
  // }

  return (
    <div className="employees-list-container">
      <h3>All Employees</h3>
      <table className="employees-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Join Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
            
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{moment(employee.joinDate).format('lll')}</td>
              <td>
                <div className={`status-badge ${employee.status.toLowerCase()}`}>{employee.status}</div>
              </td>
              <td>
              
                <div className="cell action">
          <div className="action-menu-container">
            <button
              className="action-btn"
              onClick={() => toggleActionMenu(employee._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
            {actionMenuOpen === employee._id && (
              <div className="action-menu">
                <div
                  className="action-item delete"
                 onClick={() => {
                    setId(employee._id)
                    setIsEditEmployeeModalOpen(true)
                  }}
                >
                  Edit Employee
                </div>
                 <div
                  className="action-item delete"
                 onClick={() => deleteEmployee(employee._id)}
                >
                  Delete Employee
                </div>
              
              </div>
            )}
          </div>
        </div>
              </td>
              
              {/* <div className="action-cell">
                <button className="action-btn" onClick={(e) => toggleMenu(employee.id, e)}>
                  <MoreVertical size={18} />
                </button>
                {activeMenu === employee.id && (
                  <div className="action-menu">
                    <div
                      className="action-item"
                      onClick={() => {
                        onEditEmployee(employee)
                        setActiveMenu(null)
                      }}
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </div>
                    <div
                      className="action-item delete"
                      onClick={() => {
                        onDeleteEmployee(employee.id)
                        setActiveMenu(null)
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </div>
                  </div>
                )}
              </div> */}
              {isEditEmployeeModalOpen && (
                <EditEmployeeModal onClose={() => setIsEditEmployeeModalOpen(false)} onSuccess={onSuccess} id={id} />
              )}
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="8" className="no-employees">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeesList
