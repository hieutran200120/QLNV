import React, { useState, useEffect } from 'react';
import { unitApi } from '../../api/unitApi';
import { Table, Popconfirm, Breadcrumb, theme, Button, Modal, message } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import { UnitModal } from './modal/UnitModal';
import { useNavigate } from 'react-router-dom';
import { date } from 'yup';
const UnitPage = () => {
    const [unit, setUnit] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isStatusModal, setIsStatusModal] = useState("Add");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [curData, setCurData] = useState([]);
    const navigate = useNavigate();
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
    const getUnit = async () => {
        try {
            const res = await unitApi.get();
            if (res) {
                setUnit(res.items);
                setTotalCount(res.totalCount);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //sửa đơn vị 
    const hanldEditUnit = (data) => {
        setCurData(data)
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    const hanldDetailUnit = (id) => {
        navigate(`/Home/UnitDetail/${id}`);
    }
    const handleDeleteUnit = async (id) => {
        const res = await unitApi.deleteUnit(id)
        if (res) {
            await getUnit();
            message.success("xóa đơn vị thành công!")
        } else {
            message.error(res.error)
        }
    }
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'userName',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.userName.includes(value),
            width: '30%',
        },
        {
            title: 'Loại',
            dataIndex: 'category',
            width: '20%',
            sorter: (a, b) => a.category.localeCompare(b.category),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'adress',
            filters: [],
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: '30%',
        },
        {
            title: 'SĐT',
            dataIndex: 'phoneNumber',
            filters: [],
            onFilter: (value, record) => record.phoneNumber.includes(value),
            filterSearch: true,
            width: '30%',
        },
        ,
        {
            title: 'Thao tác',
            width: '108px',
            render: (record) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>
                <EyeOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => hanldDetailUnit(record.id)} />
                <EditOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => hanldEditUnit(record)} />
                <Popconfirm
                    title="Xóa đơn vị này?"
                    onConfirm={() => handleDeleteUnit(record.id)}
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
        getUnit();
    }, []);

    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản lí đơn vị</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách đơn vị</Breadcrumb.Item>
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
                    dataSource={unit}
                    onChange={onChange}
                    pagination={{ pageSize: 10 }}
                />
            </div>
            <Modal
                open={isModalOpen}
                title={isStatusModal === "Add" ? "Thêm đơn vị mới" : "Cập nhập đơn vị "}
                footer={null}
                onCancel={handleCancel}
            >
                <UnitModal getUnit={getUnit} isStatusModal={isStatusModal} curData={curData} />
            </Modal>

        </>
    );
};

export default UnitPage;
