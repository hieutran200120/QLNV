import axiosInstance from "./axiosInstance";
const get = (params) => {
    return axiosInstance.get("/api/Profession", { params });
}
const create = (data) => {
    return axiosInstance.post("/api/Profession", data);
};
const update = (Id, data) => {
    return axiosInstance.put(`api/Profession?Id=${Id}`, data);
}
const deleteProfession = (Id) => {
    return axiosInstance.delete(`api/Profession?Id=${Id}`)
}
export const professionApi = {
    get,
    create,
    update,
    deleteProfession
};