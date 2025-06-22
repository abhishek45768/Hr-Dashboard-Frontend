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

  const toggleMenu = (id, e) => {
    e.stopPropagation() // Prevent triggering parent click events
    setActiveMenu(activeMenu === id ? null : id)
  }

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
            <th>Profile</th>
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
              <td className="profile-cell">
                <img src={`${baseUrl}public/profiles/${employee.profileImage}` || "/placeholder.svg"} alt={employee.fullName} className="profile-pic" />
              </td>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{moment(employee.joinDate).format('lll')}</td>
              <td>
                <div className={`status-badge ${employee.status.toLowerCase()}`}>{employee.status}</div>
              </td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn edit" onClick={() => {
                    setId(employee._id)
                    setIsEditEmployeeModalOpen(true)
                  }}>
                    <Edit2 size={16} />
                  </button>
                  <button className="action-btn delete" onClick={() => deleteEmployee(employee._id)}>
                    <Trash2 size={16} />
                  </button>
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
