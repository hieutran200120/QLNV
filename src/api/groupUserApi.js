import axiosInstance from "./axiosInstance";
const get = (params) => {
    return axiosInstance.get("/api/UserGroup", { params });
}
const create = (data) => {
    return axiosInstance.post("/api/UserGroup", data);
};
const update = (Id, data) => {
    return axiosInstance.put(`api/UserGroup?Id=${Id}`, data);
}
const deleteGroupUser = (Id) => {
    return axiosInstance.delete(`api/UserGroup?Id=${Id}`)
}
export const groupUserApi = {
    get,
    create,
    update,
    deleteGroupUser
};