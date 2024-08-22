import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Select, Input, DatePicker } from "antd";
import { professionApi } from '../../../api/professionApi';
const { Option } = Select;
const FormRelativeModal = ({ onFinish }) => {
    const [form] = Form.useForm();
    const [dataProfession, setDataProfession] = useState([]);
    //gọi nghề nghiệp
    const getProfession = async () => {
        try {
            const res = await professionApi.get();
            if (res) {
                setDataProfession(res.items);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getProfession();
    }, []);
    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <Row gutter={15}>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Họ và tên"}
                        name="UserName"
                        rules={[
                            {
                                required: true,
                                message: "Nhập họ tên",
                            }

                        ]}
                    >
                        <Input type="text" placeholder="Nhập họ tên" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Ngày sinh"}
                        name="DateOfBirth"
                        rules={[
                            {
                                required: true,
                                message: "Nhập ngày sinh",
                            }

                        ]}
                    >
                        <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày sinh" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Địa chỉ"}
                        name="Adress"
                        rules={[
                            {
                                required: true,
                                message: "Nhập địa chỉ",
                            }

                        ]}
                    >
                        <Input type="text" placeholder="Nhập địa chỉ" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Ghi chú"}
                        name="Note"
                        rules={[
                            {
                                required: true,
                                message: "Nhập ghi chú",
                            }

                        ]}
                    >
                        <Input type="text" placeholder="Nhập ghi chú" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Quan hệ"}
                        name="Relationship"
                        rules={[
                            {
                                required: true,
                                message: "Nhập quan hệ",
                            }

                        ]}
                    >
                        <Input type="text" placeholder="Nhập quan hệ" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Nghề Nghiệp"}
                        name="profession_id"
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
                            placeholder="Chọn nghề nghiệp"
                            filterOption={(input, option) =>
                                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {dataProfession.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
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
                                Tiếp theo
                            </Button>
                        </div>
                    </Form.Item>
                </Col>
                <Col span={4}></Col>
            </Row>
        </Form>
    )
}

export default FormRelativeModal