import axios from "axios";
import { toast } from "react-toastify";


const InsightAI_BACKEND_URL:string = "http://127.0.0.1:8787/api/v1"
const InsightAI_BACKEND_URL2 :string = "https://insight-ai-server.downlodemaster1.workers.dev/api/v1"
console.log(InsightAI_BACKEND_URL2)

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
    const response = await axios.post(`${InsightAI_BACKEND_URL}/user/signup`, data)
    toast.success(response.data.message);
    return response;
  } catch (error) {
    HandleError(error);
  }
};
export const getAiInfo = async (data: string) => {
  try {
    const response = await axios.post(`${InsightAI_BACKEND_URL}/user/ai`, data)
    console.log(response.data)
    return response;
  } catch (error) {
    HandleError(error);
  }
};
