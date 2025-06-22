
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useFormik } from "formik"
import * as Yup from "yup"
import { httpRequest } from "../utils/httpRequest"
import dashboardImage from "../assets/UserLogin.png"
import "../styles/Auth.css"
import { toast } from "react-toastify"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required").min(2, "Name must be at least 2 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })

const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async(values) => {
      try {
                 const response = await httpRequest(
                     `api/auth/register`,
                     "post",
                     { name:values.fullName, email:values.email, password:values.password, confirmPassword:values.confirmPassword, },
                     {},
                     false,
                     false
                 );
                 console.log("response : ", response)
                 if(response){
                  toast.success("Registration Successfully!")
                  navigate('/login')
                 }
     
                 const token = response.token
                 Cookies.set('token', token)
     
             } catch (error) {
                 console.error("Registration error:", error)
              
             }
    
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <div className="logo-box"></div>
        <span className="logo-text">LOGO</span>
      </div>

      <div className="auth-content">
        <div className="auth-left">
          <div className="dashboard-preview">
            <img src={dashboardImage || "/placeholder.svg"} alt="Dashboard Preview" />
          </div>

          <div className="left-content">
            <h2>Welcome to HR Management Dashboard</h2>
            <p>
             Track employee performance, attendance, and engagement—all in one intuitive dashboard.
            </p>

            <div className="dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-container">
            <h1>Welcome to Dashboard</h1>

         <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="fullName">
          Full name<span className="required">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full name"
          className="form-control"
          {...formik.getFieldProps("fullName")}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className="error-message">{formik.errors.fullName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email Address<span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          className="form-control"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Password<span className="required">*</span>
        </label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
        
            {...formik.getFieldProps("password")}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <HideIcon />
            ) : (
              <ShowIcon />
            )}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="error-message">{formik.errors.password}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">
          Confirm Password<span className="required">*</span>
        </label>
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control"
            {...formik.getFieldProps("confirmPassword")}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <HideIcon />
            ) : (
              <ShowIcon />
            )}
          </button>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="error-message">{formik.errors.confirmPassword}</div>
        )}
      </div>

      {formik.errors.submit && <div className="error-message">{formik.errors.submit}</div>}

      <button type="submit" className="auth-button" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Registering..." : "Register"}
      </button>

      <div className="auth-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
          </div>
        </div>
      </div>
    </div>
  )
}
const ShowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const HideIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);
export default Register
