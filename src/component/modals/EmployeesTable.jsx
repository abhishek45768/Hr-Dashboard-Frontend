"use client"

import { useState } from "react"
import { MoreVertical, Edit, Trash2 } from "react-feather"

const EmployeesTable = ({ employees, onEditEmployee, onDeleteEmployee }) => {
  const [activeMenu, setActiveMenu] = useState(null)

  const toggleMenu = (id, e) => {
    e.stopPropagation() // Prevent triggering parent click events
    setActiveMenu(activeMenu === id ? null : id)
  }

  // Close menus when clicking outside
  const handleClickOutside = () => {
    setActiveMenu(null)
  }

  return (
    <div className="employees-table-container" onClick={handleClickOutside}>
      <table className="employees-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="profile-cell">
                <img src={employee.profilePic || "/placeholder.svg"} alt={employee.name} className="profile-pic" />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.joinDate}</td>
              <td>
                <div className="action-cell">
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
                </div>
              </td>
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

export default EmployeesTable
