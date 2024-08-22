import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Select, DatePicker } from 'antd'
import { groupUserApi } from '../../../api/groupUserApi';
import { roleApi } from '../../../api/roleApi';
const OPTIONS = ['Xem danh sách cán bộ', 'chỉnh sửa thân nhân', 'Bananas', 'Helicopters'];
const GroupUserModal = ({ getGroupUser, isStatusModal, curData }) => {
    const [form] = Form.useForm();
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(100)
    const [dataRoles, setDataRoles] = useState([]);
    const filteredOptions = dataRoles.filter((o) => !selectedItems.includes(o));
    const getDataRoles = async () => {
        try {
            const params = {
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
            };

            const res = await roleApi.getListRoles(params);
            if (res) {
                setDataRoles(res.items);
            }
        } catch (error) {
            console.error(error);
        }
    };
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
    useEffect(() => {
        getDataRoles();
    }, [])
    console.log(curData)
    const onFinish = async (values) => {
        if (isStatusModal === "Add") {
            const dataSubmit = {
                ...values,
                "roleId": selectedItems
            }
            const res = await groupUserApi.create(dataSubmit)
            if (res) {
                message.success("Thêm nhóm thành công!")
                await getGroupUser();
            } else {
                message.error(res.error)
            }
        } else {
            const res = await groupUserApi.update(curData.id, values)

            if (res) {
                await getGroupUser();
                message.success("Chỉnh sửa nhóm thành công!")
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
                        class="col-xl-3 col-sm-4 mb-0">Tên nhóm:</label>
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
                            <Input type="text" placeholder="Nhập tên nhóm" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                        </Form.Item>
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Quyền hạn:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Select
                            mode="multiple"
                            placeholder="Inserted are removed"
                            value={selectedItems}
                            onChange={setSelectedItems}
                            style={{
                                width: '100%',
                            }}
                            options={filteredOptions.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                        />
                    </div>
                </div>

                <div class="pull-right" style={{ textAlign: "end" }} >
                    <Button type="primary" class="btn btn-primary" htmlType="submit" >Lưu</Button>
                </div>
            </div>

        </Form>
    )
}

export default GroupUserModal