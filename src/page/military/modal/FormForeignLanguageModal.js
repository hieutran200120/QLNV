import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Select, Input, DatePicker } from "antd";
import { foreignlanguageApi } from '../../../api/foreignlanguageApi';
const { Option } = Select;
const FormForeignLanguageModal = ({ onFinishForeignLanguage, onBack }) => {
    const [form] = Form.useForm();
    const [dataForeignLanguage, setDataForeignLanguage] = useState([]);
    //gọi dữ liệu ngoại ngữ 
    const getDataForeignLanguage = async () => {
        try {
            const res = await foreignlanguageApi.get();
            if (res) {
                setDataForeignLanguage(res.items);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getDataForeignLanguage();
    }, []);
    return (
        <Form layout="vertical" form={form} onFinish={onFinishForeignLanguage}>
            <Row gutter={15}>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Số hiệu bằng"}
                        name="certificateNumber"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đầy đủ thông tin !",
                            }

                        ]}
                    >
                        <Input type="text" placeholder="Nhập số hiệu bằng" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Ngày cấp"}
                        name="receivedDate"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đầy đủ thông tin !",
                            }

                        ]}
                    >
                        <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày cấp" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"cấp độ"}
                        name="level"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đầy đủ thông tin !",
                            }

                        ]}
                    >
                        <Input type="number" placeholder="Nhập cấp độ" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Ngôn ngữ"}
                        name="foreignLanguage_id"
                        rules={[
                            {
                                required: true,
                                message: " Vui lòng điền đầy đủ thông tin!",
                            }

                        ]}
                    >
                        <Select
                            allowClear
                            showSearch
                            placeholder="Chọn ngôn ngữ"
                            filterOption={(input, option) =>
                                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {dataForeignLanguage.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.language}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={4}></Col>
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
                                Gửi
                            </Button>
                            &nbsp;
                            <Button onClick={onBack}>Quay lại</Button>
                        </div>
                    </Form.Item>
                </Col>
                <Col span={4}></Col>
            </Row>
        </Form>
    )
}
export default FormForeignLanguageModal