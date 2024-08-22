import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, DatePicker, Select } from 'antd'
import { relativeApi } from '../../../api/relativeApi';
import moment from 'moment';
const { Option } = Select;
const RelativeModal = ({ getRelative, curData, isStatusModal, dataProfession, dataMilitary }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (curData) {

            form.setFieldsValue({
                userName: curData?.userName ? curData?.userName : "",
                dateOfBirth: curData.dateOfBirth ? moment(curData.dateOfBirth) : null,
                relationship: curData?.relationship ? curData?.relationship : "",
                adress: curData?.adress ? curData?.adress : "",
                military_id: curData?.military_id ? curData?.military_id : "",
                profession_id: curData?.profession_id ? curData?.profession_id : ""

            })
        } else {
            form.resetFields();
        }
    }, [curData, form])
    const onFinish = async (values) => {
        if (isStatusModal === "Add") {

            const res = await relativeApi.create(values)
            if (res) {
                message.success("Thêm đơn vị thành công!")
                await getRelative();
            } else {
                message.error(res.error)
            }
        } else {
            const res = await relativeApi.update(curData.id, values)

            if (res) {
                await getRelative();
                message.success("Chỉnh sửa đơn vị thành công!")
            } else {
                message.error(res.error)
            }
        }

    }
    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <div style={{ marginTop: "20px" }}>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Họ và tên:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="userName"
                            rules={[
                                {
                                    required: true,
                                    message: " Vui lòng điền đầy đủ thông tin!",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Nhập tên đầy đủ họ tên" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                        </Form.Item>
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Ngày sinh :</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            name="dateOfBirth"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập ngày sinh",
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Chọn ngày sinh"
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Địa chỉ:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="adress"
                            rules={[
                                {
                                    required: true,
                                    message: " Vui lòng điền đầy đủ thông tin!",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Nhập tên đơn vị" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                        </Form.Item>
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Quan hệ:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="relationship"
                            rules={[
                                {
                                    required: true,
                                    message: " Vui lòng điền đầy đủ thông tin!",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Nhập mối quan hệ" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                        </Form.Item>
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Ghi chú:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="note"
                        >
                            <Input type="text" placeholder="Nhập Ghi chú" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                        </Form.Item>
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Nghề nghiệp:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

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
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Cán bộ:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            name="military_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Chọn cán bộ",
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                showSearch
                                placeholder="Chọn Cán bộ"
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
                    </div>
                </div>

                <div class="pull-right" style={{ textAlign: "end" }} >
                    <Button type="primary" class="btn btn-primary" htmlType="submit" >Lưu</Button>
                </div>
            </div>

        </Form>
    )
}

export default RelativeModal