import React, { useState, useEffect } from 'react';
import { roleApi } from '../../api/roleApi';
import { Table, Popconfirm, Breadcrumb, theme, Button, Modal, message } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import RolesModal from './modal/RolesModal';
const ListRolePage = () => {
    const [roles, setRoles] = useState([]);
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
    const getRoles = async () => {
        try {
            const params = {
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
            };

            const res = await roleApi.getListRoles(params);

            if (res) {
                setRoles(res.items);
                setTotalCount(res.totalCount);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //sửa đơn vị 
    const hanldEditRoles = (data) => {
        setCurData(data)
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    const handleDeleteRoles = async (id) => {
        const res = await roleApi.deleteRoles(id)
        if (res) {
            await getRoles();
            message.success("xóa quyền thành công!")
        } else {
            message.error(res.error)
        }
    }
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            width: '90%',
        }
        ,
        {
            title: 'Thao tác',
            width: '108px',
            render: (record) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

                <EditOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => hanldEditRoles(record)} />
                <Popconfirm
                    title="Xóa quyền này?"
                    onConfirm={() => handleDeleteRoles(record.id)}
                    okText="Đồng ý"
                    cancelText="không"
                >
                    <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
                </Popconfirm>
            </div>
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    useEffect(() => {
        getRoles();
    }, [totalCount]);

    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb>
                    <Breadcrumb.Item>Quản lí quyền hạng</Breadcrumb.Item>
                    <Breadcrumb.Item>Danh sách quyền hạng</Breadcrumb.Item>
                </Breadcrumb>
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
                    dataSource={roles}
                    onChange={onChange}
                    pagination={{ pageSize: 10 }}
                />
            </div>
            <Modal
                open={isModalOpen}
                title={isStatusModal === "Add" ? "Thêm quyền mới" : "Cập nhập quyền "}
                footer={null}
                onCancel={handleCancel}
            >
                <RolesModal getRoles={getRoles} curData={curData} isStatusModal={isStatusModal} />
            </Modal>

        </>
    );
};
export default ListRolePage