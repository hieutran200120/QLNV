import axiosInstance from "./axiosInstance";
const get = (params) => {
    return axiosInstance.get("/api/Relative", { params });
}
const create = (data) => {
    return axiosInstance.post("/api/Relative", data);
};
const update = (Id, data) => {
    return axiosInstance.put(`api/Relative?Id=${Id}`, data);
}
const deleteRelative = (Id) => {
    return axiosInstance.delete(`api/Relative?Id=${Id}`)
}
export const relativeApi = {
    get,
    create,
    update,
    deleteRelative
};