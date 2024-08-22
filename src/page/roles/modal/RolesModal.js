import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Select, DatePicker } from 'antd'
import { roleApi } from '../../../api/roleApi'
const RolesModal = ({ getRoles, isStatusModal, curData }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (curData) {
            form.setFieldsValue({
                name: curData?.name ? curData?.name : "",
            })
        } else {
            form.setFieldsValue({
                name: "",
            })
        }
    }, [curData, form])
    console.log(curData)
    const onFinish = async (values) => {
        if (isStatusModal === "Add") {

            const res = await roleApi.create(values)
            if (res) {
                message.success("Thêm quyền thành công!")
                await getRoles();
            } else {
                message.error(res.error)
            }
        } else {
            const res = await roleApi.update(curData.id, values)

            if (res) {
                await getRoles();
                message.success("Chỉnh sửa quyền thành công!")
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
                        class="col-xl-3 col-sm-4 mb-0">Tên quyền:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: " Vui lòng điền đầy đủ thông tin!",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Nhập tên quyền" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
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

export default RolesModal