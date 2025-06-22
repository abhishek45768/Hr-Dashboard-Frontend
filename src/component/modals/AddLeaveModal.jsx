import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Upload } from 'react-feather';
import { toast } from 'react-toastify';
import { httpRequest } from '../../utils/httpRequest';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddLeaveSchema = Yup.object().shape({
  employee: Yup.string().required(' is required'),
  designation: Yup.string().required('Designation is required'),
  leaveDate: Yup.date()
    .required('Leave date is required')
    .min(new Date(), 'Leave date cannot be in the past'),
  reason: Yup.string()
    .required('Reason is required')
    .min(3, 'Reason must be at least 3 characters'),
  document: Yup.mixed(),
});

const AddLeaveModal = ({ onClose, onSuccess }) => {
  const initialValues = {
    employee: '',
    designation: '',
    leaveDate: null,
    reason: '',
    document: null,
  };

  const [employeeList, setEmployeeList] = useState([]);
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDocumentUpload = (setFieldValue) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      if (e.target.files?.length) {
        setFieldValue('document', e.target.files[0]);
      }
    };
    input.click();
  };

  const fetchCandidate = async () => {
    try {
      const response = await httpRequest(
        `api/employees/getEmployees`,
        'get',
        {},
        {},
        true,
        false
      );

      if (response.success) {
        setEmployeeList(response.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees');
    }
  };

  const handleAddLeave = async (values) => {
    try {
      const data = new FormData();
      data.append('employee', values.employee);
      data.append('date', values.leaveDate);
      data.append('reason', values.reason);

      if (values.document) {
        data.append('document', values.document);
      }

      console.log("data : ", data);

      const response = await httpRequest(
        `api/leaves/createLeave`,
        'post',
        data,
        {},
        true,
        true
      );

      if (response.success) {
        toast.success('Leave added successfully');
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error adding leave:', error);
      toast.error('Failed to add leave');
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue('document', file);
    }
  };

  const clearFile = (setFieldValue) => {
    setFieldValue('document', null);
    const fileInput = document.getElementById('document');
    if (fileInput) fileInput.value = '';
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  const filteredEmployees = employeeList.filter((emp) =>
    emp.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay">
      <div className="add-leave-modal">
        <div className="modal-header">
          <h2>Add New Leave</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={AddLeaveSchema}
          onSubmit={handleAddLeave}
        >
          {({ setFieldValue, values, errors, touched, isValid, dirty }) => (
            <Form className="leave-form">
              <div className="form-group">
                <div className="employee-select">
                  <Field
                    type="text"
                    name="employee"
                    placeholder="Search Employee Name"
                    autoComplete="off"
                    onClick={() => setShowEmployeeDropdown(true)}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    className={errors.employee && touched.employee ? 'error' : ''}
                  />
                  {showEmployeeDropdown && (
                    <div className="employee-dropdown">
                      {filteredEmployees.map((emp, index) => (
                        <div
                          key={index}
                          className="employee-option"
                          onClick={() => {
                            setFieldValue('employee', emp._id);
                            setFieldValue('designation', emp.position);
                            setShowEmployeeDropdown(false);
                            setSearchTerm("");
                          }}
                        >
                          {emp.fullName}
                        </div>
                      ))}
                      {filteredEmployees.length === 0 && (
                        <div className="no-results">No employees found</div>
                      )}
                    </div>
                  )}
                  {values.employee && (
                    <button
                      type="button"
                      className="clear-input"
                      onClick={() => {
                        setFieldValue('employee', '');
                        setFieldValue('designation', '');
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <ErrorMessage name="employee" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <Field
                  type="text"
                  name="designation"
                  placeholder="Designation*"
                  disabled
                  className={errors.designation && touched.designation ? 'error' : ''}
                />
                <ErrorMessage name="designation" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <DatePicker
                  selected={values.leaveDate}
                  onChange={(date) => setFieldValue('leaveDate', date)}
                  minDate={new Date()}
                  placeholderText="Select Leave Date"
                  className={`date-picker-input ${errors.leaveDate && touched.leaveDate ? 'error' : ''}`}
                  dateFormat="yyyy-MM-dd"
                  isClearable
                />
                <ErrorMessage name="leaveDate" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <div className="document-upload">
                  <label htmlFor="document" className="upload-btn">
                    <Upload size={16} className="upload-icon" />
                    Documents
                    <input
                      id="document"
                      name="document"
                      type="file"
                      className="file-input"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </label>

                  {values.document && (
                    <div className="document-preview">
                      <span>
                        {values.document.name}
                        ({Math.round(values.document.size / 1024)} KB)
                      </span>
                      <button
                        type="button"
                        onClick={() => clearFile(setFieldValue)}
                        className="clear-file-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  <ErrorMessage name="document" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-group">
                <Field
                  as="textarea"
                  name="reason"
                  placeholder="Reason*"
                  className={errors.reason && touched.reason ? 'error' : ''}
                />
                <ErrorMessage name="reason" component="div" className="error-message" />
              </div>

              <div className="form-actions">
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

export default AddLeaveModal;