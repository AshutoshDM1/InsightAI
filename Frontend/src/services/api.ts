import axios from "axios";
import { toast } from "react-toastify";


const InsightAI_BACKEND_URL :string = "http://localhost:8080"

const HandleError = (error: any): void => {
  if (error.response) {
    console.error("Server error:", error.response.data);
    toast.error(`Server error: ${error.response.data.message}`);
    return error.response.data;
  } else if (error.request) {
    console.error("No response from server:", error.request);
    toast.error("No response from server");
  } else {
    console.error("Request error:", error.message);
    toast.error(`Request error: ${error.message}`);
  }
};

export const SignUpAPI = async (data: any) => {
  try {
    const response = await axios.post(`${InsightAI_BACKEND_URL}/api/v1/signup`, data, { withCredentials: true })
    console.log(response);
    return response;
  } catch (error) {
    HandleError(error);
  }
};
