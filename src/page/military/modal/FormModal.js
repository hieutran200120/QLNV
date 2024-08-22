import React, { Fragment, useState, useEffect } from 'react';
import { Form, Row, Col, Modal, Input, DatePicker, Select, message, Steps } from 'antd';
import { unitApi } from '../../../api/unitApi';
import { militaryApi } from '../../../api/militaryApi';
import { relativeApi } from '../../../api/relativeApi';
import { foreignLanguageDetailApi } from '../../../api/foreignLanguageDetailApi';
import FormMilitaryModal from './FormMilitaryModal';
import FormRelativeModal from './FormRelativeModal';
import FormForeignLanguageModal from './FormForeignLanguageModal';
import moment from 'moment';
const FormModal = ({ open, handleModal, getMilitary, curData, isStatusModal, isModalOpenMilitary }) => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const [idMilitary, setIdMilitary] = useState();
    const [dataUnit, setDataUnit] = useState([]);
    const [current, setCurrent] = useState(0);
    const [fileList, setFileList] = useState(null);
    const onBack = () => {
        prev();
    };
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    //lấy dữ liệu đơn vị
    const getDataUnit = async () => {
        try {
            const res = await unitApi.get();
            if (res) {
                setDataUnit(res.items);
            }
        } catch (error) {
            console.error(error);
        }
    }
    // thêm cán bộ
    const onFinishMilitary = async (values) => {
        if (isStatusModal == "Add") {
            try {
                const formData = new FormData();
                console.log("Data", values)
                if (fileList) {
                    const fileObj = fileList.originFileObj;
                    formData.append(`ImageFiles`, fileObj);
                    console.log(fileObj)
                }
                formData.append("IsSex", values.IsSex);
                formData.append("UserName", values.UserName);
                formData.append("Unit_id", values.Unit_id);
                if (values.DateOfBirth) {
                    const formattedDate = moment(values.DateOfBirth).format('YYYY-MM-DD');
                    formData.append("DateOfBirth", formattedDate);
                }
                formData.append("PlaceOfBirth", values.PlaceOfBirth);
                formData.append("Note", values.Note);
                const response = await militaryApi.create(formData);
                setIdMilitary(response.id);
                message.success("Thêm mới thành công");
                next();
                form.resetFields();
                setFileList([]);
            } catch (error) {
                console.error(error);
                message.error("thêm mới thất bại");
            }
        } else {
            try {
                const formData = new FormData();
                if (fileList) {
                    const fileObj = fileList.originFileObj;
                    formData.append(`ImageFiles`, fileObj);
                    console.log(fileObj)
                }
                formData.append("IsSex", values.isSex);
                formData.append("UserName", values.userName);
                formData.append("Unit_id", values.unit_id);
                if (values.dateOfBirth) {
                    const formattedDate = moment(values.dateOfBirth).format('YYYY-MM-DD');
                    formData.append("DateOfBirth", formattedDate);
                }
                formData.append("PlaceOfBirth", values.placeOfBirth);
                formData.append("Note", values.note);
                const response = await militaryApi.update(curData.id, formData);
                if (response) {
                    message.success("chỉnh sửa thành công");
                }
            } catch (error) {
                console.error(error);
                message.error("chỉnh sửa thất bại");
            }
        }
    }
    //thêm thân nhân 
    const onFinish = async (values) => {
        if (isStatusModal === "Add") {
            const dataSubmit = {
                ...values,
                "military_id": idMilitary
            }
            const res = await relativeApi.create(dataSubmit)
            if (res) {
                message.success("Thêm thân nhân thành công!")
                next();
                form.resetFields();
                setFileList([]);
            } else {
                message.error(res.error)
            }
        }
    }
    //Thêm ngôn ngữ 
    const onFinishForeignLanguage = async (values) => {
        if (isStatusModal === "Add") {
            const dataSubmit = {
                ...values,
                "military_id": idMilitary
            }
            const res = await foreignLanguageDetailApi.create(dataSubmit)
            if (res) {
                message.success("Thêm ngoại ngữ thành công!")
            } else {
                message.error(res.error)
            }
        }
    }
    useEffect(() => {
        getDataUnit();
        getMilitary();
    }, []);
    //l
    const steps = [
        {
            key: "1",
            title: 'Cán bộ',
            content: <FormMilitaryModal dataUnit={dataUnit} onFinishMilitary={onFinishMilitary} fileList={fileList} setFileList={setFileList} />,
        },
        {
            key: "2",
            title: 'Thân nhân',
            content: <FormRelativeModal onFinish={onFinish} />,
        },
        {
            key: "2",
            title: 'Ngoại ngữ',
            content: <FormForeignLanguageModal onBack={onBack} onFinishForeignLanguage={onFinishForeignLanguage} />,
        },
    ]

    return (
        <Fragment>
            {contextHolder}
            {
                isStatusModal == "Add" ? <Modal
                    title="Thêm mới cán bộ"
                    open={open}
                    footer={null}
                    onCancel={() => handleModal()}
                >   <Steps current={current} items={steps} />
                    <div >{steps[current].content}</div>
                </Modal> : <Modal
                    title="sửa cán bộ"
                    open={isModalOpenMilitary}
                    footer={null}
                    onCancel={() => handleModal()}
                >
                    <FormMilitaryModal dataUnit={dataUnit} onFinishMilitary={onFinishMilitary} fileList={fileList} setFileList={setFileList} curData={curData} />
                </Modal>
            }
        </Fragment>
    )
}

export default FormModal