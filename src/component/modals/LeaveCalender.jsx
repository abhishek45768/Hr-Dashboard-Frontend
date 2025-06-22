// "use client"

// import { useState } from "react"
// import { ChevronLeft, ChevronRight } from "react-feather"

// const LeaveCalendar = ({ leaves }) => {
//   const [currentMonth, setCurrentMonth] = useState(8) // September (0-indexed)
//   const [currentYear, setCurrentYear] = useState(2024)

//   // Generate days for the calendar
//   const getDaysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate()
//   }

//   const getFirstDayOfMonth = (month, year) => {
//     return new Date(year, month, 1).getDay()
//   }

//   const daysInMonth = getDaysInMonth(currentMonth, currentYear)
//   const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

//   // Previous month
//   const goToPrevMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11)
//       setCurrentYear(currentYear - 1)
//     } else {
//       setCurrentMonth(currentMonth - 1)
//     }
//   }

//   // Next month
//   const goToNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0)
//       setCurrentYear(currentYear + 1)
//     } else {
//       setCurrentMonth(currentMonth + 1)
//     }
//   }

//   // Format month name
//   const getMonthName = (month) => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ]
//     return months[month]
//   }

//   // Check if a date has leaves
//   const hasLeaves = (day) => {
//     const formattedDate = `${currentMonth + 1}/${day}/${String(currentYear).slice(-2)}`
//     return leaves.some((leave) => leave.date === formattedDate)
//   }

//   // Get approved leaves for the current month
//   const approvedLeaves = leaves.filter(
//     (leave) => leave.status.toLowerCase() === "approved" && leave.date.split("/")[0] === String(currentMonth + 1),
//   )

//   return (
//     <div className="leave-calendar-section">
//       <h3>Leave Calendar</h3>
//       <div className="calendar-container">
//         <div className="calendar-header">
//           <button className="month-nav prev" onClick={goToPrevMonth}>
//             <ChevronLeft size={16} />
//           </button>
//           <h4>
//             {getMonthName(currentMonth)}, {currentYear}
//           </h4>
//           <button className="month-nav next" onClick={goToNextMonth}>
//             <ChevronRight size={16} />
//           </button>
//         </div>

//         <div className="calendar-grid">
//           <div className="calendar-weekday">S</div>
//           <div className="calendar-weekday">M</div>
//           <div className="calendar-weekday">T</div>
//           <div className="calendar-weekday">W</div>
//           <div className="calendar-weekday">T</div>
//           <div className="calendar-weekday">F</div>
//           <div className="calendar-weekday">S</div>

//           {/* Empty cells for days before the first day of month */}
//           {Array.from({ length: firstDay }).map((_, index) => (
//             <div key={`empty-${index}`} className="calendar-day empty"></div>
//           ))}

//           {/* Days of the month */}
//           {Array.from({ length: daysInMonth }).map((_, index) => {
//             const day = index + 1
//             const hasLeaveEvents = hasLeaves(day)

//             return (
//               <div key={day} className={`calendar-day ${hasLeaveEvents ? "has-leaves" : ""}`}>
//                 {day}
//                 {hasLeaveEvents && <div className="leave-indicator"></div>}
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       <div className="approved-leaves">
//         <h4>Approved Leaves</h4>
//         <div className="approved-leaves-list">
//           {approvedLeaves.map((leave, index) => (
//             <div key={index} className="approved-leave-item">
//               <div className="approved-leave-profile">
//                 <img src={leave.profilePic || "/placeholder.svg"} alt={leave.name} />
//               </div>
//               <div className="approved-leave-info">
//                 <p className="approved-leave-name">{leave.name}</p>
//                 <p className="approved-leave-designation">{leave.designation}</p>
//               </div>
//               <div className="approved-leave-date">{leave.date}</div>
//             </div>
//           ))}
//           {approvedLeaves.length === 0 && <p className="no-approved-leaves">No approved leaves for this month</p>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LeaveCalendar

import { useState } from "react"
import { Calendar } from "rsuite"
import "rsuite/dist/rsuite.min.css"

const LeaveCalendar = ({ leaves }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const isApprovedLeave = (date) => {
    const formatted = `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).slice(-2)}`
    return leaves.some(
      (leave) => leave.date === formatted && leave.status.toLowerCase() === "approved"
    )
  }

  return (
    <div className="leave-calendar-section" style={{ height: "100vh" }}>
      <h3>Leave Calendar</h3>

      <Calendar
        bordered
        value={currentDate}
        onChange={setCurrentDate}
        renderCell={(date) => {
          return isApprovedLeave(date) ? (
            <div style={{ backgroundColor: "#dff0d8", borderRadius: 4 }}>🌴</div>
          ) : null
        }}
      style={{
        maxHeight:'400px'
      }}
      />

      <div className="approved-leaves mt-4" style={{ height: '100vh' }}>
        <h4>Approved Leaves</h4>
        <div className="approved-leaves-list">
          {leaves
            .filter(
              (leave) =>
                leave.status.toLowerCase() === "approved" &&
                parseInt(leave.date.split("/")[0]) === currentDate.getMonth() + 1
            )
            .map((leave, index) => (
              <div key={index} className="approved-leave-item">
                <div className="approved-leave-profile">
                  <img src={leave.profilePic || "/placeholder.svg"} alt={leave.name} />
                </div>
                <div className="approved-leave-info">
                  <p className="approved-leave-name">{leave.name}</p>
                  <p className="approved-leave-designation">{leave.designation}</p>
                </div>
                <div className="approved-leave-date">{leave.date}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default LeaveCalendar

