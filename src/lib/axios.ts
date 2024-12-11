import { BASE_API_URL } from "@/utils/config";
import axios, { AxiosInstance } from "axios";

const baseURL = BASE_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});
