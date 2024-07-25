import axios from "axios";
import { toast } from "react-toastify";

// const InsightAI_BACKEND_URL2:string = "http://127.0.0.1:8787/api/v1"
const InsightAI_BACKEND_URL: string =
  "https://insight_ai_server.downlodemaster1.workers.dev/api/v1";

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
    const response = await axios.post(
      `${InsightAI_BACKEND_URL}/user/signup`,
      data
    );
    toast.success(response.data.message);
    return response;
  } catch (error) {
    HandleError(error);
  }
};
export const getAiInfo = async (data: { input: string; uid: string }) => {
  try {
    const response = await axios.post(`${InsightAI_BACKEND_URL}/ai`, data);
    return response;
  } catch (error) {
    HandleError(error);
  }
};

interface UserData {
  displayName: string ;
  photoURL: string ;
  uid: string ;
  email: string ;
}


export function getUserDataFromLocalStorage(): UserData | null {
  const userDataString = localStorage.getItem("user");
  if (userDataString) {
    try {
      const userData: UserData = JSON.parse(userDataString);
      return userData;
    } catch (error) {
      console.error("Error parsing user data from local storage:", error);
      return null;
    }
  }
  return null;
}
export const setitem = (item: string): void => {
  try {
    localStorage.getItem(item);
    console.log(item)
    return;
  } catch (error) {
    HandleError(error);
  }
};
