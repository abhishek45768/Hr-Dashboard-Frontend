import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
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

const EditCandidateModal = ({ onClose, onSuccess, candidateId }) => {
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeName, setResumeName] = useState('');
    const [formData, setFormData] = useState(null);

    const handleFileChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        console.log("file : ", file);
        if (file) {
            setResumeFile(file);
            setResumeName(file.name);
            setFieldValue('resume', file);
            console.log("resumeFile : ", resumeFile);
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
                `api/candidates/updateCandidate/${candidateId}`,
                "put",
                data,
                {},
                true,
                true
            );
            console.log("response : ", response)

            if (response.success) {
                toast.success("candidate edited successfully")
            }
            onSuccess()
            onClose()
        } catch (error) {
            console.log(error);
        }
    }



    const fetchCandidate = async () => {
        try {
            const response = await httpRequest(
                `api/candidates/getcandidate/${candidateId}`,
                "get",
                {},
                {},
                true,
                false
            );
            console.log("response : ", response)

            if (response.success) {
                const { fullName, email, phone, position, experience } = response.data;
                setFormData({
                    name: fullName || '',
                    email: email || '',
                    phone: phone || '',
                    position: position || '',
                    experience: experience || '',
                    resume: '',
                    declaration: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const controller = new AbortController()
        fetchCandidate()
        return () => controller.abort()
    }, [])

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Edit Candidate</h2>
                    <button className="close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="modal-body">
                    <Formik
                        initialValues={formData}
                        enableReinitialize
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleAddCandidate(values)
                        }}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name<span className="required">*</span></label>
                                        <Field name="name" type="text" />
                                        <ErrorMessage name="name" component="div" className="error-message" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address<span className="required">*</span></label>
                                        <Field name="email" type="email" />
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone Number<span className="required">*</span></label>
                                        <Field name="phone" type="tel" />
                                        <ErrorMessage name="phone" component="div" className="error-message" />
                                    </div>
                                    <div className="form-group">
                                        <label>Position<span className="required">*</span></label>
                                        <Field name="position" type="text" />
                                        <ErrorMessage name="position" component="div" className="error-message" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Experience<span className="required">*</span></label>
                                        <Field name="experience" type="text" />
                                        <ErrorMessage name="experience" component="div" className="error-message" />
                                    </div>
                                    <div className="form-group">
                                        <label>Resume<span className="required">*</span></label>
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
                                            <div className="file-upload">
                                                <input
                                                    type="file"
                                                    id="resume"
                                                    name="resume"
                                                    onChange={(e) => handleFileChange(e, setFieldValue)}
                                                    accept=".pdf,.doc,.docx"
                                                    className="file-input"
                                                />
                                                <label htmlFor="resume" className="file-label">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="17 8 12 3 7 8" />
                                                        <line x1="12" y1="3" x2="12" y2="15" />
                                                    </svg>
                                                </label>
                                            </div>
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
                                        <ErrorMessage name="declaration" component="div" className="error-message" />
                                    </div>
                                </div>
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

export default EditCandidateModal;
