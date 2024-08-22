import axiosInstance from "./axiosInstance";
const get = (params) => {
    return axiosInstance.get("/api/Military", { params });
}
const create = (data) => {
    return axiosInstance.post("/api/Military", data);
};
const update = (Id, data) => {
    return axiosInstance.put(`api/Military?Id=${Id}`, data);
}
const deleteMilitary = (Id) => {
    return axiosInstance.delete(`api/Military?Id=${Id}`)
}
export const militaryApi = {
    get,
    create,
    update,
    deleteMilitary
};