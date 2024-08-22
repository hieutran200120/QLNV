import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Select, Input, DatePicker, Radio, Upload, Modal } from "antd";
const { Option } = Select;
const DecisionModal = ({ dataUnit, dataMilitary, onFinish }) => {
    const [form] = Form.useForm();
    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Row gutter={15} >

                <Form.Item
                    style={{ marginBottom: "4px" }}
                    label={"Ngày quyết định"}
                    name="dayDecision"
                    rules={[
                        {
                            required: true,
                            message: "Nhập ngày quyết định",
                        },
                    ]}
                >
                    <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày quyết định" />
                </Form.Item>
                <Col span={24}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Cán bộ"}
                        name="military_id"
                        rules={[
                            {
                                required: true,
                                message: "Chọn Cán bộ",
                            },
                        ]}
                    >
                        <Select
                            allowClear
                            showSearch
                            placeholder="Chọn cán bộ "
                            filterOption={(input, option) =>
                                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {dataMilitary.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.userName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Đơn vị đến"}
                        name="unit_Arrives_id"
                        rules={[
                            {
                                required: true,
                                message: "Chọn đơn vị đến",
                            },
                        ]}
                    >
                        <Select
                            allowClear
                            showSearch
                            placeholder="Chọn đơn vị đến "
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
                        label={"Đơn vị đi"}
                        name="unit_Go_id"
                        rules={[
                            {
                                required: true,
                                message: "Chọn đơn vị đi",
                            },
                        ]}
                    >
                        <Select
                            allowClear
                            showSearch
                            placeholder="Chọn đơn vị đi "
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
                        label={"Vị trí mới"}
                        name="newPosition"
                        rules={[
                            {
                                required: true,
                                message: "Nhập vị trí mới",
                            },
                        ]}
                    >
                        <Input type="text" placeholder="Nhập vị trí mới " />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Vị trí cũ "}
                        name="oldPosition"
                    >
                        <Input type="text" placeholder="Nhập vị trí cũ " />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Số quyết định "}
                        name="decisionNumber"
                    >
                        <Input type="number" placeholder="Nhập số quyết định " />
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
                                "Đề xuất"
                            </Button>
                        </div>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default DecisionModal