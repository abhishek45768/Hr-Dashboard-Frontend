"use client"

import { useEffect, useState } from "react"
import Layout from "../component/layout/Layout"
import EmployeesTable from "../component/modals/EmployeesTable"
import EmployeesList from "../component/modals/EmployeesList"
import AddEmployeeModal from "../component/modals/AddEmployeeModal"
import EditEmployeeModal from "../component/modals/EditEmployeeModal"
import PositionFilter from "../component/modals/PositionFilter"
import { Plus } from "react-feather"
import "../styles/Employees.css"
import { httpRequest } from "../utils/httpRequest"
import { toast } from "react-toastify"

const Employees = () => {
    const baseUrl = import.meta.env.VITE_Backend_Url
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false)

    const [editingEmployee, setEditingEmployee] = useState(null)
    const [selectedPosition, setSelectedPosition] = useState("all")
    const [ischange, setischange] = useState(false)

    const [employees, setEmployees] = useState([])

    const handleEditEmployee = (updatedEmployee) => {
        setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)))
        setEditingEmployee(null)
    }

    const handleDeleteEmployee = async (id) => {
        try {
            const response = await httpRequest(
                `api/employees/employee/${id}`,
                "delete",
                {},
                {},
                true,
                false
            );
            console.log("response : ", response)

            setischange(prev => !prev)
            if (response.success) {
                toast.success('employee deleted successfully')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePositionChange = (position) => {
        setSelectedPosition(position)
    }

    const filteredEmployees = employees.filter((employee) => {
        return selectedPosition === "all" || employee.position.toLowerCase().includes(selectedPosition.toLowerCase())
    })
const [search,setsearch]=useState("")
const [position,setposition]=useState("")

    const fetchCandidate = async () => {
        try {
            const response = await httpRequest(
                `api/employees/getEmployees`,
                "get",
                {},
                {search,position},
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


    // useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;

    //     const fetchData = async () => {
    //         try {
    //             await fetchCandidate(signal);
    //         } catch (error) {
    //             if (error.name !== 'AbortError') {
    //                 console.error('Fetch error:', error);
    //             }
    //         }
    //     };

    //     fetchData();

    //     return () => controller.abort();
    // }, [ischange]);

    useEffect(() => {
        fetchCandidate();
    }, [ischange,search,position]);

    return (
        <Layout title='Employees'>
            <div className="employees-page">
                <div className="employees-header">
                
                   
                    <div className="employees-actions" style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                       <div style={{ display: "flex", gap: "10px" }}>
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
            <div className="search-box" >
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
                   
                    </div>
                </div>

                <div className="employees-content">
                    <EmployeesList employees={filteredEmployees} deleteEmployee={handleDeleteEmployee} onSuccess={() => setischange(prev => !prev)} />
                </div>

                {/* <div className="employees-content">
                    <EmployeesTable
                        employees={filteredEmployees}
                        onEditEmployee={(employee) => setEditingEmployee(employee)}
                        onDeleteEmployee={handleDeleteEmployee}
                    />
                </div> */}

                {isAddEmployeeModalOpen && (
                    <AddEmployeeModal onClose={() => setIsAddEmployeeModalOpen(false)} onSuccess={() => setischange(prev => !prev)} />
                )}
                {editingEmployee && (
                    <EditEmployeeModal
                        employee={editingEmployee}
                        onClose={() => setEditingEmployee(null)}
                        onSubmit={handleEditEmployee}
                    />
                )}
            </div>
        </Layout>
    )
}

export default Employees
