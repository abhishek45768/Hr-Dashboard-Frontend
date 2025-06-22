
import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { X, Upload } from "react-feather"
import { httpRequest } from "../../utils/httpRequest"
import { toast } from "react-toastify"

const AddEmployeeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  position: Yup.string().required("Position is required"),
  department: Yup.string().required("Department is required"),
  joinDate: Yup.date().required("Join date is required"),
  profileImage: Yup.mixed(),
  // Profile image is optional
})

const AddEmployeeModal = ({ onClose, onSuccess }) => {
  const initialValues = {
    name: "",
    email: "",
    position: "",
    department: "",
    joinDate: "",
    profileImage: null,
  }

  // Departments list
  const departments = ["UI/UX", "Engineering", "Product", "Marketing", "Sales", "HR", "Finance", "Operations"]

  const handleImageUpload = (setFieldValue) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      if (e.target.files?.length) {
        const file = e.target.files[0]
        setFieldValue("profileImage", file)

        const reader = new FileReader()
        reader.onload = (event) => {
          setFieldValue("profilePreview", event.target.result)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const [showDatePicker, setShowDatePicker] = React.useState(false)


  const handleAddEmployee = async (values) => {
    try {
      console.log("values : ", values);
      const data = new FormData();
      data.append('fullName', values.name);
      data.append('email', values.email);
      data.append('phone', values.phone);
      data.append('position', values.position);
      data.append('department', values.department);
      data.append('joinDate', values.joinDate);
      data.append('profileImage', values.profileImage)
      console.log("data : ", data)

      const response = await httpRequest(
        `api/employees/createEmployee`,
        "post",
        data,
        {},
        true,
        true
      );
      console.log("response : ", response)

      if (response.success) {
        toast.success("Employee added successfully")
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="modal-overlay">
      <div className="add-employee-modal">
        <div className="modal-header">
          <h2>Add New Employee</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={AddEmployeeSchema}
          onSubmit={handleAddEmployee}
        >
          {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
            <Form className="employee-form">
              <div className="form-row">
                <div className="form-group profile-upload">
                  <div className="profile-preview" onClick={() => handleImageUpload(setFieldValue)}>
                    {values.profilePreview ? (
                      <img src={values.profilePreview || "/placeholder.svg"} alt="Profile preview" />
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
                    <label htmlFor="name">Full Name*</label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter full name"
                      className={errors.name && touched.name ? "error" : ""}
                    />
                    <ErrorMessage name="name" component="div" className="error-message" />
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
                  <label htmlFor="position">Position*</label>
                  <Field
                    type="text"
                    name="position"
                    id="position"
                    placeholder="Enter position"
                    className={errors.position && touched.position ? "error" : ""}
                  />
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
                          setFieldValue("joinDate", e.target.value)
                          setShowDatePicker(false)
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
                <button type="submit" className="save-btn" disabled={!isValid || !dirty}>
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddEmployeeModal
