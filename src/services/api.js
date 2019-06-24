import axios from "axios";

const host = process.env.APP_HOST || "http://localhost";
const port = process.env.APP_PORT || 4000;

const api = axios.create({ baseURL: `${host}:${port}` });

export default api;
