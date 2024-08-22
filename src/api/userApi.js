import axiosInstance from "./axiosInstance";
const login = (data) => {
    return axiosInstance.post("/api/User/login", data);
}
const create = (data) => {
    return axiosInstance.post("/api/User", data);
};


export const userApi = {
    login,
    create,
};