"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "react-feather"

const PositionFilter = ({ selectedPosition, onPositionChange, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

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

  // Get the label of the selected position
  const getSelectedLabel = () => {
    const position = options.find((position) => position.value === selectedPosition)
    return position ? position.label : "Position"
  }

  return (
    <div className="position-filter" ref={dropdownRef}>
      <button className="filter-btn" onClick={() => setIsOpen(!isOpen)}>
        {getSelectedLabel()}
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`filter-option ${selectedPosition === option.value ? "selected" : ""}`}
              onClick={() => {
                onPositionChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PositionFilter
