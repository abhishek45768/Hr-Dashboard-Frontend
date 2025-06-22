import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import '../../styles/Modal.css';
import { httpRequest } from '../../utils/httpRequest';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is Required'),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  phone: Yup.string().required('Phone number is Required'),
  position: Yup.string().required('Position is Required'),
  experience: Yup.string().required('Experience is Required'),
  resume: Yup.mixed()
    .required('Resume is required'),
  declaration: Yup.boolean().oneOf([true], 'You must accept the declaration'),
});

const AddCandidateModal = ({ onClose, onSuccess }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState('');

  const handleFileChange = async(e, setFieldValue) => {
    const file = e.target.files[0];
    console.log("file : ", file);
  
    if (file) {
      setResumeFile(file);
      setResumeName(file.name);
      setFieldValue('resume', file);
     
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
        setFieldValue('resume', response.data);
      }
      } catch (error) {
        console.log('error', error)
      }
     
      
    }else{
      return
    }
  };
  const handleRemoveFile = (setFieldValue) => {
    setResumeFile(null);
    setResumeName('');
    setFieldValue('resume', null);
  };


  const handleAddCandidate = async (values) => {
    try {
      console.log("values : ", values);
    
      const data = new FormData();
      data.append('fullName', values.name);
      data.append('email', values.email);
      data.append('phone', values.phone);
      data.append('position', values.position);
      data.append('experience', values.experience);
      data.append('resume', values.resume);
      console.log("data : ", data)
      
      const response = await httpRequest(
        `api/candidates/createCandidate`,
        "post",
        data,
        {},
        true,
        true
      );
      console.log("response : ", response)

      if (response.success) {
        toast.success("candidate added successfully")
         onSuccess()
      onClose()
      }
     
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add Candidate</h2>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              position: '',
              experience: '',
              resume: '',
              declaration: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleAddCandidate(values)
            }}
          >
            {({ setFieldValue,handleChange,handleBlur,values }) => (
              <Form>
                <div className="form-row">
                  <div className="form-group">
                  
                    <Field name="name" placeholder="Full Name *" type="text" />
                    <ErrorMessage name="name " component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                 
                    <Field name="email"  placeholder="Email *" type="email" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    
                    <Field name="phone" type="tel" placeholder="Phone Number *" />
                    <ErrorMessage name="phone" component="div" className="error-message" />
                  </div>
               <div className="form-group">
      <select
        name="position"
        value={values.position}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ width: "365px" }}
        className="filter-dropdown"
      >
        <option value="">Position</option>
        <option value="Intern">Intern</option>
        <option value="Full Time">Full Time</option>
        <option value="Junior">Junior</option>
        <option value="Senior">Senior</option>
        <option value="Team Lead">Team Lead</option>
      </select>

      <ErrorMessage name="position" component="div" className="error-message" />
    </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    
                    <Field name="experience" placeholder="Experience *" type="text" />
                    <ErrorMessage name="experience" component="div" className="error-message" />
                  </div>
                  <div className="form-group">

  {resumeName ? (
    <div className="file-selected">
      <span>{resumeName}</span>
      <button type="button" className="remove-file" onClick={() => handleRemoveFile(setFieldValue)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  ) : (
    <label htmlFor="resume" className="file-upload full-clickable" style={{display:"flex",justifyContent:"space-between"}}>
      <span className="file-placeholder">Resume *</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <input
        type="file"
        id="resume"
        name="resume"
        onChange={(e) => handleFileChange(e, setFieldValue)}
        accept=".pdf,.doc,.docx"
        className="file-input"
      />
    </label>
  )}
  <ErrorMessage name="resume" component="div" className="error-message" />
</div>

                </div>
                <div className="form-row declaration">
                  <div className="checkbox-group">
                    <Field name="declaration" type="checkbox" id="declaration" />
                    <label htmlFor="declaration">
                      I hereby declare that the above information is true to the best of my knowledge and belief
                    </label>
                   
                  </div>
                
                </div>
                   <ErrorMessage name="declaration" component="div" className="error-message" />
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateModal;
