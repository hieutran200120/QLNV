import React, { useState, useEffect } from 'react'

import { foreignlanguageApi } from '../../api/foreignlanguageApi'
import { Table, Popconfirm, Breadcrumb, theme, Button, Modal, message } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import ForeignLanguageModal from './modal/ForeignLanguageModal'
import { useNavigate } from 'react-router-dom';
const ForeignLanguagePage = () => {
    const [foreignLanguage, setforeignLanguage] = useState([]);
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
    // gọi ngoại ngữ
    const getForeignLanguage = async () => {
        try {
            const res = await foreignlanguageApi.get();
            if (res) {
                setforeignLanguage(res.items);
                setTotalCount(res.totalCount);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //sửa ngoại ngữ
    const hanldEditForeignLanguage = (data) => {
        setCurData(data)
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    //xóa ngoại ngữ
    const handleDeleteForeignLanguage = async (id) => {
        const res = await foreignlanguageApi.deleteforeignlanguage(id)
        if (res) {
            await getForeignLanguage();
            message.success("xóa ngoại ngữ thành công!")
        } else {
            message.error(res.error)
        }
    }
    //xem chi tiết 
    const hanldDetailForeignLanguage = (id) => {
        navigate(`/Home/ForeignLanguage/${id}`);
    }
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'language',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.language.includes(value),
            width: '90%',
        }
        ,
        {
            title: 'Thao tác',
            width: '108px',
            render: (record) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>
                <EyeOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => hanldDetailForeignLanguage(record.id)} />
                <EditOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => hanldEditForeignLanguage(record)} />
                <Popconfirm
                    title="Xóa ngôn ngữ này?"
                    onConfirm={() => handleDeleteForeignLanguage(record.id)}
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
        getForeignLanguage();
    }, [totalCount]);

    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản lí ngoại ngữ</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách ngoại ngữ</Breadcrumb.Item>
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
                    dataSource={foreignLanguage}
                    onChange={onChange}
                    pagination={{ pageSize: 10 }}
                />
            </div>
            <Modal
                open={isModalOpen}
                title={isStatusModal === "Add" ? "Thêm ngôn ngữ mới" : "Cập nhập ngôn ngữ "}
                footer={null}
                onCancel={handleCancel}
            >
                <ForeignLanguageModal getForeignLanguage={getForeignLanguage} isStatusModal={isStatusModal} curData={curData} />
            </Modal>

        </>
    );
}

export default ForeignLanguagePage