import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Select, Input, DatePicker, Radio, Upload, Modal } from "antd";
import { LockOutlined, MailOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import moment from 'moment';
const { Option } = Select;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const FormMilitaryModal = ({ dataUnit, onFinishMilitary, fileList, setFileList, curData }) => {
    const [form] = Form.useForm();
    console.log(curData)
    useEffect(() => {
        if (curData) {
            form.setFieldsValue({
                userName: curData?.userName ? curData?.userName : "",
                dateOfBirth: curData.dateOfBirth ? moment(curData.dateOfBirth) : null,
                isSex: curData?.isSex ?? "",
                placeOfBirth: curData?.placeOfBirth ? curData?.placeOfBirth : "",
                unit_id: curData?.unit_id ? curData?.unit_id : "",
                note: curData?.note ? curData?.note : "",

            })
        } else {
            form.resetFields();
        }
    }, [curData, form])
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1));
    };
    const handleChange = ({ file, fileList }) => {
        const newFileList = file ? [file] : [];

        if (fileList.length === 0) {
            setFileList(null);
            setPreviewImage('');
            setPreviewTitle('');
            setPreviewOpen(false);
        } else {
            setFileList(newFileList.length > 0 ? { ...newFileList[0] } : null);
            setPreviewImage('');
            setPreviewTitle('');
            setPreviewOpen(false);
        }
    };
    const handleCancel = () => setPreviewOpen(false);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',

            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinishMilitary}
        >
            <Row gutter={15} >
                <Row gutter={15} style={{ display: 'flex', alignContent: "center" }}>
                    <Col span={12} >
                        <Upload
                            listType="picture-card"
                            fileList={fileList ? [fileList] : []}
                            name='ImageFile'
                            onPreview={handlePreview}
                            onChange={handleChange}
                            style={{ textAlign: "center" }}
                        >
                            {fileList ? null : uploadButton}
                        </Upload>
                    </Col>
                </Row>
                <Col span={12}>
                    <Form.Item
                        style={{ marginBottom: '4px' }}
                        label="Giới tính"
                        name={curData ? "isSex" : "IsSex"}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn giới tính',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={true}>Nam</Radio>
                            <Radio value={false}>Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Họ Tên"}
                        name={curData ? "userName" : "UserName"}
                        rules={[
                            {
                                required: true,
                                message: "Nhập Họ tên",
                            },
                        ]}
                    >
                        <Input type="text" placeholder="Nhập họ tên" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Đơn vị"}
                        name={curData ? "unit_id" : "Unit_id"}
                        rules={[
                            {
                                required: true,
                                message: "Chọn đơn vị",
                            },
                        ]}
                    >
                        <Select
                            allowClear
                            showSearch
                            placeholder="Chọn đơn vị"
                            filterOption={(input, option) =>
                                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {dataUnit.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.userName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Ngày sinh"}
                        name={curData ? "dateOfBirth" : "DateOfBirth"}
                        rules={[
                            {
                                required: true,
                                message: "Nhập ngày sinh",
                            },
                        ]}
                    >
                        <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày sinh" />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Nơi sinh"}
                        name={curData ? "placeOfBirth" : "PlaceOfBirth"}
                        rules={[
                            {
                                required: true,
                                message: "Nhập nơi sinh",
                            },
                        ]}
                    >
                        <Input type="text" placeholder="Nhập nơi sinh" />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Ghi chú"}
                        name={curData ? "note" : "Note"}
                    >
                        <Input type="text" placeholder="Nhập ghi chú" />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item>
                        <div
                            style={{
                                display: "flex",
                                marginTop: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                {curData ? "Lưu" : "Tiếp theo"}
                            </Button>
                        </div>
                    </Form.Item>
                </Col>
            </Row>
        </Form>

    )
}

export default FormMilitaryModal