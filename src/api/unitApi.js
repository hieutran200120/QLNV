import axiosInstance from "./axiosInstance";
const get = (data) => {
    return axiosInstance.get("/api/Unit", data);
}
const create = (data) => {
    return axiosInstance.post("/api/Unit", data);
};
const update = (Id, data) => {
    return axiosInstance.put(`api/Unit?Id=${Id}`, data);
}
const deleteUnit = (Id) => {
    return axiosInstance.delete(`api/Unit?Id=${Id}`)
}
export const unitApi = {
    get,
    create,
    update,
    deleteUnit
};