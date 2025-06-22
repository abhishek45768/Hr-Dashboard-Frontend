// import { useEffect, useState } from "react"
// import { Formik, Form, Field, ErrorMessage } from "formik"
// import * as Yup from "yup"
// import { X, Calendar, Upload } from "react-feather"
// import { httpRequest } from "../../utils/httpRequest"
// import '../../styles/Employees.css'

// const EditEmployeeModal = ({ onClose, onSuccess, id }) => {
//   const baseUrl = import.meta.env.VITE_Backend_Url
//   const [showPositionDropdown, setShowPositionDropdown] = useState(false)
//   const [showDatePicker, setShowDatePicker] = useState(false)
//   const [employee, setEmployee] = useState({})
//   const [ischange, setischange] = useState(false)
//   const [initialFormValues, setInitialFormValues] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     department: "",
//     position: "",
//     joinDate: "",
//     profileImage: null,
//     profilePreview: ""
//   });

//   const departments = ["UI/UX", "Engineering", "Product", "Marketing", "Sales", "HR", "Finance", "Operations"]

//   const fetchCandidate = async () => {
//     try {
//       const response = await httpRequest(
//         `api/employees/employee/${id}`,
//         "get",
//         {},
//         {},
//         true,
//         false
//       );
//       console.log("response : ", response)

//       if (response.success) {
//         setInitialFormValues({
//           fullName: response.data.fullName,
//           email: response.data.email || "",
//           phone: response.data.phone || "",
//           department: response.data.department || "",
//           position: response.data.position || "",
//           joinDate: response.data.joinDate || "",
//           profileImage: response.data.profileImage || null,
//           profilePreview: response.data.profileImage || ""
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   const EditEmployeeSchema = Yup.object().shape({
//     fullName: Yup.string().required("Full name is required").min(3, "Name must be at least 3 characters"),
//     email: Yup.string().email("Invalid email format").required("Email address is required"),
//     phone: Yup.string()
//       .required("Phone number is required")
//       .matches(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone number must be in format (XXX) XXX-XXXX"),
//     department: Yup.string().required("Department is required"),
//     position: Yup.string().required("Position is required"),
//     joinDate: Yup.string().required("Join date is required"),
//   });

//   // const initialValues = {
//   //   fullName: employee.name || "",
//   //   email: employee.email || "",
//   //   phone: employee.phone || "",
//   //   department: employee.department || "",
//   //   position: employee.position || "",
//   //   joinDate: employee.joinDate || "",
//   //   profileImage: employee.profileImage || "",
//   // }

//   const positions = ["Intern", "Full Time", "Junior", "Senior", "Team Lead"]

//   const formatPhoneNumber = (value) => {
//     if (!value) return value
//     const phoneNumber = value.replace(/[^\d]/g, "")
//     if (phoneNumber.length < 4) return phoneNumber
//     if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
//     return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
//   }



//   const handleEditEmployee = async (values) => {
//     try {
//       console.log("values : ", values);
//       const data = new FormData();
//       data.append('fullName', values.name);
//       data.append('email', values.email);
//       data.append('phone', values.phone);
//       data.append('position', values.position);
//       data.append('department', values.department);
//       data.append('joinDate', values.joinDate);
//       data.append('profileImage', values.profileImage)
//       console.log("data : ", data)

//       const response = await httpRequest(
//         `api/employees/employee/${id}`,
//         "put",
//         data,
//         {},
//         true,
//         true
//       );
//       console.log("response : ", response)

//       if (response.success) {
//         toast.success("Employee added successfully")
//       }
//       onSuccess()
//       onClose()
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   useEffect(() => {
//     fetchCandidate();
//   }, [ischange]);

//   return (
//     <div className="modal-overlay">
//       <div className="add-employee-modal">
//         <div className="modal-header">
//           <h2>Manage Employee</h2>
//           <button className="close-btn" onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>

//         <Formik
//           initialValues={initialFormValues}
//           validationSchema={EditEmployeeSchema}
//           onSubmit={handleEditEmployee}
//           enableReinitialize
//         >
//           {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
//             <Form className="employee-form">
//               <div className="form-row">
//                 <div className="form-group profile-upload">
//                   <div className="profile-preview" onClick={() => handleImageUpload(setFieldValue)}>
//                     {values.profilePreview ? (
//                       <img src={`${baseUrl}public/profiles/${values.profilePreview}` || "/placeholder.svg"} alt="Profile preview" />
//                     ) : (
//                       <div className="upload-placeholder">
//                         <Upload size={24} />
//                         <span>Upload Photo</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="form-group-col">
//                   <div className="form-group">
//                     <label htmlFor="name">Full Name*</label>
//                     <Field
//                       type="text"
//                       name="fullName"
//                       id="fullName"
//                       placeholder="Enter full name"
//                       className={errors.name && touched.name ? "error" : ""}
//                     />
//                     <ErrorMessage name="fullName" component="div" className="error-message" />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="email">Email Address*</label>
//                     <Field
//                       type="email"
//                       name="email"
//                       id="email"
//                       placeholder="Enter email address"
//                       className={errors.email && touched.email ? "error" : ""}
//                     />
//                     <ErrorMessage name="email" component="div" className="error-message" />
//                   </div>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="position">Position*</label>
//                   <Field
//                     type="text"
//                     name="position"
//                     id="position"
//                     placeholder="Enter position"
//                     className={errors.position && touched.position ? "error" : ""}
//                   />
//                   <ErrorMessage name="position" component="div" className="error-message" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="department">Department*</label>
//                   <Field
//                     as="select"
//                     name="department"
//                     id="department"
//                     className={errors.department && touched.department ? "error" : ""}
//                   >
//                     <option value="">Select Department</option>
//                     {departments.map((dept, index) => (
//                       <option key={index} value={dept}>
//                         {dept}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage name="department" component="div" className="error-message" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="joinDate">Join Date*</label>
//                   <div className="date-input">
//                     <Field
//                       type="text"
//                       name="joinDate"
//                       id="joinDate"
//                       placeholder="Select join date"
//                       readOnly
//                       onClick={() => setShowDatePicker(true)}
//                       className={errors.joinDate && touched.joinDate ? "error" : ""}
//                     />
//                     <button type="button" className="calendar-btn" onClick={() => setShowDatePicker(true)}>
//                       <span className="calendar-icon"></span>
//                     </button>
//                   </div>
//                   <ErrorMessage name="joinDate" component="div" className="error-message" />

//                   {showDatePicker && (
//                     <div className="date-picker">
//                       <input
//                         type="date"
//                         onChange={(e) => {
//                           setFieldValue("joinDate", e.target.value)
//                           setShowDatePicker(false)
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="form-actions">
//                 <button type="button" className="cancel-btn" onClick={onClose}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="save-btn">
//                   Save
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   )
// }

// export default EditEmployeeModal





import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X, Upload } from "react-feather";
import { toast } from "react-toastify";
import { httpRequest } from "../../utils/httpRequest";
import '../../styles/Employees.css';

const EditEmployeeModal = ({ onClose, onSuccess, id }) => {
  const baseUrl = import.meta.env.VITE_Backend_Url;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    joinDate: "",
    profileImage: null,
    profilePreview: ""
  });

  const departments = ["UI/UX", "Engineering", "Product", "Marketing", "Sales", "HR", "Finance", "Operations"];
  const positions = ["Intern", "Full Time", "Junior", "Senior", "Team Lead"];

  const EditEmployeeSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required").min(3, "Name must be at least 3 characters"),
    email: Yup.string().email("Invalid email format").required("Email address is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone number must be in format (XXX) XXX-XXXX"),
    department: Yup.string().required("Department is required"),
    position: Yup.string().required("Position is required"),
    joinDate: Yup.string().required("Join date is required"),
  });

  const fetchCandidate = async () => {
    try {
      const response = await httpRequest(
        `api/employees/employee/${id}`,
        "get",
        {},
        {},
        true,
        false
      );

      if (response.success) {
        setInitialFormValues({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          department: response.data.department || "",
          position: response.data.position || "",
          joinDate: response.data.joinDate || "",
          profileImage: response.data.profileImage || null,
          profilePreview: response.data.profileImage || ""
        });
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      toast.error("Failed to load employee data");
    }
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleImageUpload = (setFieldValue) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      if (e.target.files?.length) {
        const file = e.target.files[0];
        setFieldValue("profileImage", file);
        setFieldValue("profilePreview", URL.createObjectURL(file));
      }
    };
    input.click();
  };

  const handleEditEmployee = async (values) => {
    try {
      const data = new FormData();
      data.append('fullName', values.fullName);
      data.append('email', values.email);
      data.append('phone', values.phone);
      data.append('position', values.position);
      data.append('department', values.department);
      data.append('joinDate', values.joinDate);

      if (values.profileImage) {
        if (typeof values.profileImage === 'string') {
          // If it's a string (existing image URL), don't append to FormData
        } else {
          data.append('profileImage', values.profileImage);
        }
      }

      const response = await httpRequest(
        `api/employees/employee/${id}`,
        "put",
        data,
        {},
        true,
        true
      );

      if (response.success) {
        toast.success("Employee updated successfully");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee");
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, [id]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-employee-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Manage Employee</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={initialFormValues}
          validationSchema={EditEmployeeSchema}
          onSubmit={handleEditEmployee}
          enableReinitialize
        >
          {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
            <Form className="employee-form">
              <div className="form-row">
                <div className="form-group profile-upload">
                  <div className="profile-preview" onClick={() => handleImageUpload(setFieldValue)}>
                    {values.profilePreview ? (
                      <img
                        src={
                          typeof values.profilePreview === 'string' && values.profilePreview.startsWith('blob:')
                            ? values.profilePreview
                            : `${baseUrl}public/profiles/${values.profilePreview}`
                        }
                        alt="Profile preview"
                      />
                    ) : (
                      <div className="upload-placeholder">
                        <Upload size={24} />
                        <span>Upload Photo</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group-col">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name*</label>
                    <Field
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Enter full name"
                      className={errors.fullName && touched.fullName ? "error" : ""}
                    />
                    <ErrorMessage name="fullName" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address*</label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email address"
                      className={errors.email && touched.email ? "error" : ""}
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <Field
                    name="phone"
                    id="phone"
                    placeholder="(XXX) XXX-XXXX"
                    className={errors.phone && touched.phone ? "error" : ""}
                    value={values.phone}
                    onChange={(e) => {
                      const formattedPhone = formatPhoneNumber(e.target.value);
                      setFieldValue("phone", formattedPhone);
                    }}
                  />
                  <ErrorMessage name="phone" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="position">Position*</label>
                  <Field
                    as="select"
                    name="position"
                    id="position"
                    className={errors.position && touched.position ? "error" : ""}
                  >
                    <option value="">Select Position</option>
                    {positions.map((pos, index) => (
                      <option key={index} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="position" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department*</label>
                  <Field
                    as="select"
                    name="department"
                    id="department"
                    className={errors.department && touched.department ? "error" : ""}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="department" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="joinDate">Join Date*</label>
                  <div className="date-input">
                    <Field
                      type="text"
                      name="joinDate"
                      id="joinDate"
                      placeholder="Select join date"
                      readOnly
                      onClick={() => setShowDatePicker(true)}
                      className={errors.joinDate && touched.joinDate ? "error" : ""}
                    />
                    <button type="button" className="calendar-btn" onClick={() => setShowDatePicker(true)}>
                      <span className="calendar-icon"></span>
                    </button>
                  </div>
                  <ErrorMessage name="joinDate" component="div" className="error-message" />

                  {showDatePicker && (
                    <div className="date-picker">
                      <input
                        type="date"
                        onChange={(e) => {
                          setFieldValue("joinDate", e.target.value);
                          setShowDatePicker(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  disabled={!isValid || !dirty}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
