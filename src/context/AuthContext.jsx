import { createContext, useState, useContext, useEffect } from "react"
import axios from 'axios'
import { httpRequest } from "../utils/httpRequest"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const AuthContext = createContext()

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider")
//     }
//     return context
// }

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const storedUser = localStorage.getItem("user")
                const token = localStorage.getItem("token")

                if (storedUser && token) {
                    setUser(JSON.parse(storedUser))
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error("Error checking auth status:", error)
                localStorage.removeItem("user")
                localStorage.removeItem("token")
            } finally {
                setLoading(false)
            }
        }

        checkAuthStatus()
    }, [])

    const register = async (userData) => {
        setLoading(true)
        setError(null)

        try {
            console.log("userdata : ", userData)

            const response = await httpRequest(
                `api/auth/register`,
                "post",
                userData,
                {},
                false,
                false
            );
            console.log("response : ", response)

            const newUser = response.data

            const token = response.token
            Cookies.set('token', token)

            localStorage.setItem("user", JSON.stringify(newUser))
            localStorage.setItem("token", token)
            localStorage.setItem("expireBy", response.expireBy)

            setUser(newUser)
            setIsAuthenticated(true)

            setLoading(false)

            return response.success === true ? true : false
        } catch (error) {
            console.error("Registration error:", error)
            setError(error.message || "Registration failed")
            setLoading(false)
            return false
        }
    }

   

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("expireBy")
        Cookies.remove('token')

        setUser(null)
        setIsAuthenticated(false)

        return true
    }

    const value = {
        user,
        isAuthenticated,
        loading,
        error,
        register,

        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
