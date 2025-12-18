import axios from "axios";

const InsightAI_BACKEND_URL: string = import.meta.env.VITE_SERVER_URL;

export const baseURL = `${InsightAI_BACKEND_URL}/api/v1`;

export const api = axios.create({
  baseURL,
});
