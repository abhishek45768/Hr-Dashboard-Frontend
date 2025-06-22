import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const httpRequest = async (
    endpoint,
    method = "GET",
    body = {},
    queryParams = {},
    authentication = false,
    formData = false,
) => {
    try {
        
        const baseUrl = import.meta.env.VITE_Backend_Url
        console.log("base url : ", baseUrl)
        const config = {
            method: method.toUpperCase(),
            url: `${baseUrl}${endpoint}`,
            params: queryParams,
            data: body,
            headers: {
                "Content-Type": formData ? "multipart/form-data" : "application/json",
            },
        };

        if (authentication) {
            const token = Cookies.get("token");
            console.log("http token : ", token)
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        const response = await axios(config);

        return response.data;
    } catch (error) {
        console.log('error', error)
        if (error?.response?.data === "Unauthorized"  ) {
           window.location.href='/login'
        }
        const serverMessage =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.data?.errors?.msg ||
            error?.response?.data ||
            "An unknown error occurred";

        toast.error(serverMessage);
        return false;
    }
};
