import axiosInstance from "./axiosInstance";
const get = (params) => {
    return axiosInstance.get("/api/ForeignLanguage", { params });
}
const create = (data) => {
    return axiosInstance.post("/api/ForeignLanguage", data);
};
const update = (Id, data) => {
    return axiosInstance.put(`api/ForeignLanguage?Id=${Id}`, data);
}
const deleteforeignlanguage = (Id) => {
    return axiosInstance.delete(`api/ForeignLanguage?Id=${Id}`)
}
export const foreignlanguageApi = {
    get,
    create,
    update,
    deleteforeignlanguage
};