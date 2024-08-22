import React, { useState, useEffect } from 'react'

import { groupUserApi } from '../../api/groupUserApi';
import { Table, Popconfirm, Breadcrumb, theme, Button, Modal, message } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import RolesPage from '../roles/RolesPage';
import GroupUserModal from './modal/GroupUserModal';
const GroupUserPage = () => {
    const [groupUser, setGroupUser] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isStatusModal, setIsStatusModal] = useState("Add");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(10)
    const [curData, setCurData] = useState([]);
    //hàm mở,đóng modal
    const showModalAdd = () => {
        setIsModalOpen(true);
        setIsStatusModal("Add");
        setCurData('');
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    // gọi đơn vị
    const getGroupUser = async () => {
        try {
            const res = await groupUserApi.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
            });
            if (res) {
                setGroupUser(res.items);
                setTotalCount(res.totalCount);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //sửa đơn vị 
    const hanldEditGroupUser = (data) => {
        setCurData(data)
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    const handleDeleteGroupUser = async (id) => {
        const res = await groupUserApi.deleteGroupUser(id)
        if (res) {
            await getGroupUser();
            message.success("xóa nhóm thành công!")
        } else {
            message.error(res.error)
        }
    }
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.userName.includes(value),
            width: '90%',
        }
        ,
        {
            title: 'Thao tác',
            width: '108px',
            render: (record) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

                <EditOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => hanldEditGroupUser(record)} />
                <Popconfirm
                    title="Xóa nhóm này?"
                    onConfirm={() => handleDeleteGroupUser(record.id)}
                    okText="Đồng ý"
                    cancelText="không"
                >
                    <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
                </Popconfirm>
            </div>
        }
    ];
    useEffect(() => {
        getGroupUser();
    }, [totalCount]);
    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản lí nhóm người dùng</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách nhóm người dùng</Breadcrumb.Item>
                <Button
                    type="primary"
                    style={{ marginLeft: "auto" }}
                    onClick={showModalAdd}
                >
                    <PlusOutlined />
                    Thêm mới
                </Button>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record) => {
                            return <RolesPage record={record} />
                        },

                    }}
                    rowKey="id"
                    dataSource={groupUser}
                    onChange={onChange}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: 400 }}
                />
            </div>
            <Modal
                open={isModalOpen}
                title={isStatusModal === "Add" ? "Thêm nhóm người dùng mới" : "Cập nhập nhóm người dùng "}
                footer={null}
                onCancel={handleCancel}
            >
                <GroupUserModal getGroupUser={getGroupUser} isStatusModal={isStatusModal} curData={curData} />
            </Modal>

        </>
    )
}

export default GroupUserPage