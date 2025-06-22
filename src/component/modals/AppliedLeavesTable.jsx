import { FileText, ChevronDown } from "react-feather"

const AppliedLeavesTable = ({ leaves }) => {
  const baseUrl = import.meta.env.VITE_Backend_Url

  return (
    <div className="applied-leaves-section">
      <h3>Applied Leaves</h3>
      <table className="leaves-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Docs</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td className="profile-cell">
                <img src={`${baseUrl}public/profiles/${leave.employee.profileImage}` || "/placeholder.svg"} alt={leave.name} className="profile-pic" />
              </td>
              <td>
                <div className="employee-info">
                  <p className="employee-name">{leave.employee.fullName}</p>
                  <p className="employee-designation">{leave.employee.position}</p>
                </div>
              </td>
              <td>{leave.date}</td>
              <td>{leave.reason}</td>
              <td>
                <div className={`status-badge ${leave.status.toLowerCase()}`}>
                  <select name="status" value={leave.status}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </td>
              <td>
                {leave.document && (
                  <button className="docs-btn">
                    <FileText size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
          {leaves.length === 0 && (
            <tr>
              <td colSpan="6" className="no-leaves">
                No leaves found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AppliedLeavesTable
