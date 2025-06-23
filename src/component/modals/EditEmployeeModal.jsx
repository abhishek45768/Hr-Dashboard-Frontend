
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
      .required("Phone number is required"),
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

  const handleImageUpload = async(setFieldValue) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange =async (e) => {
      if (e.target.files?.length) {
        const file = e.target.files[0];
        setFieldValue("profileImage", file);
        setFieldValue("profilePreview", URL.createObjectURL(file));
          const formData=new FormData();
      formData.append("media",file);
      formData.append("path","profile");
      formData.append("isArray",false);
      try {
         const response=await httpRequest(
        "api/upload",
        'post',
        formData,
        {},
        true,true
      );
      if(response){
        setFieldValue('profileImage', response.data);
      }
      } catch (error) {
        console.log('error', error)
      }
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
  

  {/* Two Column Input Rows */}
  <div className="form-row">
    <div className="form-group">
 
      <Field
        type="text"
        name="fullName"
        placeholder="Enter full name"
        className={errors.fullName && touched.fullName ? "error" : ""}
      />
      <ErrorMessage name="fullName" component="div" className="error-message" />
    </div>

    <div className="form-group">

      <Field
        type="email"
        name="email"
        placeholder="Enter email address"
        className={errors.email && touched.email ? "error" : ""}
      />
      <ErrorMessage name="email" component="div" className="error-message" />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">

      <Field
        name="phone"
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

    <div className="form-group">

      <Field as="select" name="department" className={errors.department && touched.department ? "error" : ""}>
        <option value="">Select Department</option>
        {departments.map((dept, index) => (
          <option key={index} value={dept}>{dept}</option>
        ))}
      </Field>
      <ErrorMessage name="department" component="div" className="error-message" />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
    
      <Field as="select" name="position" className={errors.position && touched.position ? "error" : ""}>
        <option value="">Select Position</option>
        {positions.map((pos, index) => (
          <option key={index} value={pos}>{pos}</option>
        ))}
      </Field>
      <ErrorMessage name="position" component="div" className="error-message" />
    </div>

    <div className="form-group">
 
      <div className="date-input">
        <Field
          type="text"
          name="joinDate"
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

  {/* Actions */}
  <div className="form-actions">
    <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
    <button type="submit" className="save-btn" >Save</button>
  </div>
</Form>

          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
