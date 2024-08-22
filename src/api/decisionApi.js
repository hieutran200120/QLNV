import axiosInstance from "./axiosInstance";
const get = (params) => {
    return axiosInstance.get("/api/Decision", { params });
}
const create = (data) => {
    return axiosInstance.post("/api/Decision", data);
};
const update = (Id, data) => {
    return axiosInstance.put(`api/Decision?Id=${Id}`, data);
}
const deleteDecision = (Id) => {
    return axiosInstance.delete(`api/Decision?Id=${Id}`)
}
export const decisionApi = {
    get,
    create,
    update,
    deleteDecision
};