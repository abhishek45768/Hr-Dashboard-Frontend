import { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import "../styles/Candidates.css";
import AddCandidateModal from "../component/modals/AddCandidateModal";
import EditCandidateModal from "../component/modals/EditCandidateModal";
import { httpRequest } from "../utils/httpRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Candidates = () => {
  const basePicUrl = import.meta.env.VITE_Base_Pic_url;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [ischange, setischange] = useState(false);
  const [id, setId] = useState("");
const [position,setposition]=useState("")
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const toggleActionMenu = (id) => {
    if (actionMenuOpen === id) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(id);
    }
  };

  const handleAddCandidate = (newCandidate) => {
    // setCandidates([...candidates, {
    //   id: String(candidates.length + 1).padStart(2, '0'),
    //   ...newCandidate
    // }]);
    setCandidates(newCandidate);
    setShowModal(false);
  };

  const handleDownloadResume = async (id) => {
    try {
      console.log(`Downloading resume for candidate ${id}`);
      const response = await httpRequest(
        `api/candidates/downloadResume/${id}`,
        "get",
        {},
        {},
        true,
        false
      );
      console.log("response : ", response);

      if (response.success) {
        toast.success("Resume downloaded successfully");
      }
    } catch (error) {
      console.log(error);
    }
    setActionMenuOpen(null);
  };

  const handleDeleteCandidate = async (id) => {
    try {
      console.log(`Downloading resume for candidate ${id}`);
      const response = await httpRequest(
        `api/candidates/deleteCandidate/${id}`,
        "delete",
        {},
        {},
        true,
        false
      );
      console.log("response : ", response);

      if (response.success) {
        toast.success("candidate deleted successfully");
        setischange((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
    setActionMenuOpen(null);
  };

  const [search, setsearch] = useState("");
  const fetchCandidate = async () => {
    try {
      const response = await httpRequest(
        `api/candidates/getcandidates`,
        "get",
        {},
        { search,status:statusFilter,position },
        true,
        false
      );
      console.log("response : ", response);

      if (response.success) {
        setCandidates(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlestatuschange = async (id, status) => {
    try {
      const response = await httpRequest(
        `api/candidates/updateCandidateStatus/${id}`,
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

  useEffect(() => {
    fetchCandidate();
  }, [ischange,position, search,statusFilter]);

  return (
    <Layout title="Candidates">
      <div className="candidates-container">
        <div className="filters-container">
          <div style={{ display: "flex", gap: "10px" }}>
            <div className="filter" >
              <select
              style={{width:"160px"}}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
<div className="filter" >
              <select
              style={{width:"160px"}}
                value={position}
                onChange={(e) => setposition(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">Position</option>
                <option value="Intern">Intern</option>
                <option value="Full Time">Full Time</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Team Lead">Team Lead</option>
            
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <div className="search-box">
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
              <input
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                type="text"
                placeholder="Search"
              />
            </div>
            <button
              className="add-candidate-btn"
              onClick={() => setShowModal(true)}
            >
              Add Candidate
            </button>
          </div>
        </div>

        <div className="candidates-table">
  <div
    className="table-header"
    style={{
      display: "grid",
      gridTemplateColumns: "0.5fr 1.5fr 2fr 1.5fr 1.5fr 1fr 0.8fr 0.5fr",
      fontWeight: "bold",
      backgroundColor: "#3b0062",
      color: "white",
      alignItems: "center"
    }}
  >
    <div className="header-cell sr-no">Sr no.</div>
    <div className="header-cell name">Candidates Name</div>
    <div className="header-cell email">Email Address</div>
    <div className="header-cell phone">Phone Number</div>
    <div className="header-cell position">Position</div>
    <div className="header-cell status">Status</div>
    <div className="header-cell experience">Experience</div>
    <div className="header-cell action">Action</div>
  </div>

  <div className="table-body" style={{ height: "60vh" }}>
    {candidates.map((candidate, index) => (
      <div
        className="table-row"
        key={candidate._id}
        style={{
          display: "grid",
          gridTemplateColumns: "0.5fr 1.5fr 2fr 1.5fr 1.5fr 1fr 0.8fr 0.5fr",
          alignItems: "center"
        }}
      >
        <div className="cell sr-no">{index + 1}</div>
        <div className="cell name">{candidate.fullName}</div>
        <div className="cell email">{candidate.email}</div>
        <div className="cell phone">{candidate.phone}</div>
        <div className="cell position">{candidate.position}</div>

        <div className="cell status">
          <select
            value={candidate.status}
            onChange={(e) => handlestatuschange(candidate._id, e.target.value)}
            className={`status-badge ${candidate.status.toLowerCase()}`}
          >
            <option value={candidate.status}>{candidate.status}</option>
            {["New", "Selected", "Rejected"]
              .filter((status) => status !== candidate.status)
              .map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
        </div>

        <div className="cell experience">{candidate.experience}</div>
        <div className="cell action">
          <div className="action-menu-container">
            <button
              className="action-btn"
              onClick={() => toggleActionMenu(candidate._id)}
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
            {actionMenuOpen === candidate._id && (
              <div className="action-menu">
                <div
                  className="action-item delete"
                  onClick={() => handleDeleteCandidate(candidate._id)}
                >
                  Delete Candidate
                </div>
                <div
                  className="action-item"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = `${basePicUrl}${candidate.resume}`;
                    link.download = "";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download Resume
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

      {showModal && (
        <AddCandidateModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setischange((prev) => !prev)}
        />
      )}

      {showEditModal && (
        <EditCandidateModal
          onClose={() => setshowEditModal(false)}
          onSuccess={() => setischange((prev) => !prev)}
          candidateId={id}
        />
      )}
    </Layout>
  );
};

export default Candidates;
