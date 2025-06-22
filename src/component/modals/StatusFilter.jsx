"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "react-feather"

const StatusFilter = ({ selectedStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "approved", label: "Approved" },
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Get the label of the selected status
  const getSelectedLabel = () => {
    const status = statuses.find((status) => status.value === selectedStatus)
    return status ? status.label : "Status"
  }

  return (
    <div className="status-filter" ref={dropdownRef}>
      <button className="status-btn" onClick={() => setIsOpen(!isOpen)}>
        {getSelectedLabel()}
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="status-dropdown">
          {statuses.map((status) => (
            <div
              key={status.value}
              className={`status-option ${selectedStatus === status.value ? "selected" : ""}`}
              onClick={() => {
                onStatusChange(status.value)
                setIsOpen(false)
              }}
            >
              {status.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StatusFilter
