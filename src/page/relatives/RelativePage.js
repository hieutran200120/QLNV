import React, { useState, useEffect } from 'react'
import RelativeModal from './modal/RelativeModal';
import { relativeApi } from '../../api/relativeApi';
import { professionApi } from '../../api/professionApi';
import { militaryApi } from '../../api/militaryApi';
import { Table, Popconfirm, Breadcrumb, theme, Button, Modal, message } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment';
const RelativePage = () => {
    const [relative, setRelative] = useState([]);
    const [dataProfession, setDataProfession] = useState([]);
    const [dataMilitary, setDataMilitary] = useState([]);
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
    const getRelative = async () => {
        try {
            const res = await relativeApi.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
            });
            if (res) {
                setRelative(res.items);
                setTotalCount(res.totalCount);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //gọi nghề nghiệp
    const getProfession = async () => {
        try {
            const res = await professionApi.get();
            if (res) {
                setDataProfession(res.items);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //gọi cán bộ 
    const getMilitary = async () => {
        try {
            const res = await militaryApi.get({
                Limit: currentPage,
                PageIndex: rowsPerPage,
            });
            if (res) {
                setDataMilitary(res.items);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //sửa thân nhân 
    const hanldEditRelative = (data) => {
        setCurData(data)
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    const handleDeleteRelative = async (id) => {
        const res = await relativeApi.deleteRelative(id)
        if (res) {
            await getRelative();
            message.success("xóa đơn vị thành công!")
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
            dataIndex: 'userName',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.userName.includes(value),
            width: '30%',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            width: '30%',
            sorter: (a, b) => a.category.localeCompare(b.category),
            render: (date) => moment(date).format('DD/MM/YYYY'),
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
            title: 'Ghi chú',
            dataIndex: 'Note',
            filters: [],
            onFilter: (value, record) => record.note.includes(value),
            filterSearch: true,
            width: '30%',
        },
        ,
        {
            title: 'Thao tác',
            width: '108px',
            render: (record) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

                <EditOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => hanldEditRelative(record)} />
                <Popconfirm
                    title="Xóa thân nhân này?"
                    onConfirm={() => handleDeleteRelative(record.id)}
                    okText="Đồng ý"
                    cancelText="không"
                >
                    <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
                </Popconfirm>
            </div>
        }
    ];
    useEffect(() => {
        getRelative();
        getProfession();
        getMilitary();
    }, [totalCount]);
    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản lí thân nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách thân nhân</Breadcrumb.Item>
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
                    dataSource={relative}
                    onChange={onChange}
                    pagination={{ pageSize: 10 }}
                />
            </div>
            <Modal
                open={isModalOpen}
                title={isStatusModal === "Add" ? "Thêm thân nhân mới" : "Cập nhập thân nhân "}
                footer={null}
                onCancel={handleCancel}
            >
                <RelativeModal getRelative={getRelative} curData={curData} isStatusModal={isStatusModal} getProfession={getProfession} dataProfession={dataProfession} dataMilitary={dataMilitary} />
            </Modal>

        </>
    )
}

export default RelativePage