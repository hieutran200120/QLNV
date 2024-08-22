import axiosInstance from "./axiosInstance";
const get = ({ params }) => {
    return axiosInstance.get("/api/ForeignLanguageDetail", { params });
}
const create = (data) => {
    return axiosInstance.post("/api/ForeignLanguageDetail", data);
};
const update = (Id, data) => {
    return axiosInstance.put(`api/ForeignLanguageDetail?Id=${Id}`, data);
}
const deleteforeignLanguageDetail = (Id) => {
    return axiosInstance.delete(`api/ForeignLanguageDetail?Id=${Id}`)
}
export const foreignLanguageDetailApi = {
    get,
    create,
    update,
    deleteforeignLanguageDetail
};