import React, { useEffect } from 'react'
import { Form, Input, Button, message, Select, Tabs } from 'antd'
import { unitApi } from "../../../api/unitApi"

export const UnitModal = ({ getUnit, isStatusModal, curData }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (curData) {
            form.setFieldsValue({
                userName: curData?.userName ? curData?.userName : "",
                category: curData?.category ? curData?.category : "",
                phoneNumber: curData?.phoneNumber ? curData?.phoneNumber : "",
                adress: curData?.adress ? curData?.adress : "",
            })
        } else {
            form.setFieldsValue({
                userName: "",
                category: "",
                phoneNumber: "",
                adress: "",
            })
        }
    }, [curData, form])
    console.log(curData)
    const onFinish = async (values) => {
        if (isStatusModal === "Add") {

            const res = await unitApi.create(values)
            if (res) {
                message.success("Thêm đơn vị thành công!")
                await getUnit();
            } else {
                message.error(res.error)
            }
        } else {
            const res = await unitApi.update(curData.id, values)

            if (res) {
                await getUnit();
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
                        class="col-xl-3 col-sm-4 mb-0">Tên đơn vị:</label>
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
                            <Input type="text" placeholder="Nhập tên đơn vị" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                        </Form.Item>
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Loại:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="category"
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
                        class="col-xl-3 col-sm-4 mb-0">Số điện thoại:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="phoneNumber"
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
                <div class="pull-right" style={{ textAlign: "end" }} >
                    <Button type="primary" class="btn btn-primary" htmlType="submit" >Lưu</Button>
                </div>
            </div>

        </Form>
    )
}
