import React, { useState, useEffect } from 'react';
import { militaryApi } from '../../api/militaryApi';
import { Table, Popconfirm, Breadcrumb, Button, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import FormMilitaryModal from '../military/modal/FormMilitaryModal';
import moment from 'moment';

const MilitaryPage = () => {
    const [military, setMilitary] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [curData, setCurData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenMilitary, setIsModalOpenMilitary] = useState(false);
    const [isStatusModal, setIsStatusModal] = useState("Add");
    const [totalCount, setTotalCount] = useState(0);

    const handleModal = () => {
        setIsModalOpen(false);
        setIsModalOpenMilitary(false);
    };

    const getMilitary = async () => {
        try {
            const res = await militaryApi.get({
                Limit: currentPage,
                PageIndex: rowsPerPage,
            });
            if (res) {
                setMilitary(res.items);
                setTotalCount(res.totalCount);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //sửa cán bộ
    const handleEditMilitary = (data) => {
        setCurData(data);
        setIsModalOpenMilitary(true);
        setIsStatusModal("Edit");
    };
    //xóa cán bộ
    const handleDeleteMilitary = async (id) => {
        const res = await militaryApi.deleteMilitary(id)
        if (res) {
            await getMilitary();
            message.success("xóa cán bộ thành công!")
        } else {
            message.error(res.error)
        }
    }
    const onChange = (pagination) => {
        setCurrentPage(pagination.current);
        setRowsPerPage(pagination.pageSize);
    };

    useEffect(() => {
        getMilitary();
    }, [currentPage, rowsPerPage, totalCount]);

    const columns = [
        {
            title: 'ảnh',
            dataIndex: 'image',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.userName.includes(value),
            width: '15%',
            render: (img) => (
                <img
                    src={`https://localhost:7213/Images/${img}`}
                    alt="User"
                    style={{ width: '100%', height: 'auto' }}
                />
            ),
        },
        {
            title: 'Tên',
            dataIndex: 'userName',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.userName.includes(value),
            width: '23%',
        },
        {
            title: 'Giới tính',
            dataIndex: 'isSex',
            width: '10%',
            sorter: (a, b) => a.category.localeCompare(b.category),
            render: (sex) => sex == true ? "Nam" : "Nữ",
        },
        {
            title: 'Địa chỉ sinh',
            dataIndex: 'placeOfBirth',
            filters: [],
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: '30%',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            filters: [],
            onFilter: (value, record) => record.phoneNumber.includes(value),
            filterSearch: true,
            width: '30%',
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
        ,
        {
            title: 'Thao tác',
            width: '108px',
            render: (record) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }} >

                <EditOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => handleEditMilitary(record)} />
                <Popconfirm
                    title="Xóa đơn vị này?"
                    onConfirm={() => handleDeleteMilitary(record.id)}
                    okText="Đồng ý"
                    cancelText="không"
                >
                    <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
                </Popconfirm>
            </div>
        }
    ];

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Quản lí cán bộ</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách cán bộ</Breadcrumb.Item>
                <Button
                    type="primary"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => {
                        setIsModalOpen(true);
                        setIsStatusModal("Add");
                    }}
                >
                    <PlusOutlined />
                    Thêm mới
                </Button>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={military}
                    rowKey="id"
                    onChange={onChange}
                    pagination={{
                        current: currentPage,
                        pageSize: rowsPerPage,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30', '100'],
                        total: totalCount,
                        showTotal: (total) => `Tổng số: ${total}`,
                    }}
                    scroll={{ y: 400 }}
                />
            </div>
            <React.Suspense fallback={<div>Loading...</div>}>
                <ModalAdd
                    handleModal={handleModal}
                    open={isModalOpen}
                    getMilitary={getMilitary}
                    curData={curData}
                    isStatusModal={isStatusModal}
                    isModalOpenMilitary={isModalOpenMilitary}
                />
            </React.Suspense>
        </>
    );
};

const ModalAdd = React.lazy(() => import('../military/modal/FormModal'));
export default MilitaryPage;
