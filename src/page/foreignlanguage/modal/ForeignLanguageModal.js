import React, { useEffect } from 'react'
import { Form, Input, Button, message, Select, DatePicker } from 'antd'
import { foreignlanguageApi } from '../../../api/foreignlanguageApi';
const ForeignLanguageModal = ({ getForeignLanguage, isStatusModal, curData }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (curData) {
            form.setFieldsValue({
                language: curData?.language ? curData?.language : "",
            })
        } else {
            form.setFieldsValue({
                language: "",
            })
        }
    }, [curData, form])
    console.log(curData)
    const onFinish = async (values) => {
        if (isStatusModal === "Add") {

            const res = await foreignlanguageApi.create(values)
            if (res) {
                message.success("Thêm ngoại ngữ thành công!")
                await getForeignLanguage();
            } else {
                message.error(res.error)
            }
        } else {
            const res = await foreignlanguageApi.update(curData.id, values)

            if (res) {
                await getForeignLanguage();
                message.success("Chỉnh sửa ngoại ngữ thành công!")
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
                        class="col-xl-3 col-sm-4 mb-0">Tên ngoại ngữ:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="language"
                            rules={[
                                {
                                    required: true,
                                    message: " Vui lòng điền đầy đủ thông tin!",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Nhập tên ngoại ngữ" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
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

export default ForeignLanguageModal