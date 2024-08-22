import axiosInstance from "./axiosInstance";
const get = (params) => {
    return axiosInstance.get("/api/Roles", { params });
}
const getListRoles = (params) => {
    return axiosInstance.get("/api/Roles/ListRole", { params });
}
const create = (data) => {
    return axiosInstance.post("/api/Roles", data);
};
const update = (Id, data) => {
    return axiosInstance.put(`api/Roles?Id=${Id}`, data);
}
const deleteRoles = (Id) => {
    return axiosInstance.delete(`api/Roles?Id=${Id}`)
}
export const roleApi = {
    get,
    getListRoles,
    create,
    update,
    deleteRoles
};