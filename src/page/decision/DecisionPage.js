import React, { useState, useEffect } from 'react'
import { decisionApi } from '../../api/decisionApi'
import { Table, Popconfirm, Breadcrumb, theme, Button, Modal, message } from "antd"
import { militaryApi } from '../../api/militaryApi'
import { unitApi } from '../../api/unitApi'
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import DecisionModal from './modal/DecisionModal';
import moment from 'moment';
const DecisionPage = () => {
    const [decision, setDecision] = useState([]);
    const [dataMilitary, setDataMilitary] = useState([]);
    const [dataUnit, setDataUnit] = useState([]);
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
    // gọi quyết định
    const getDecision = async () => {
        try {
            const res = await decisionApi.get();
            if (res) {
                setDecision(res.items);
                setTotalCount(res.totalCount);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // gọi danh sách cán bộ
    const getDataMilitary = async () => {
        try {
            const res = await militaryApi.get({
                Limit: "1",
                PageIndex: "100",
            });
            if (res) {
                setDataMilitary(res.items);
                setTotalCount(res.totalCount);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // gọi danh sách đơn vị
    const getDataUnit = async () => {
        try {
            const res = await unitApi.get({
                Limit: "1",
                PageIndex: "100",
            });
            if (res) {
                setDataUnit(res.items);
                setTotalCount(res.totalCount);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //gửi đề xuất lên 
    const onFinish = async (values) => {
        if (isStatusModal === "Add") {

            const res = await decisionApi.create(values)
            if (res) {
                message.success("Đề xuất thành công!")
                await getDecision();
            } else {
                message.error(res.error)
            }
        }
    }
    //sửa quyết định
    const hanldEditDecision = (data) => {
        setCurData(data)
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    //xóa quyết định
    const handleDeleteDecision = async (id) => {
        const res = await decisionApi.deleteDecision(id)
        if (res) {
            await getDecision();
            message.success("xóa quyết định thành công!")
        } else {
            message.error(res.error)
        }
    }
    //xem chi tiết 
    const hanldDetailDecision = (id) => {
        navigate(`/Home/ForeignLanguage/${id}`);
    }
    const columns = [
        {
            title: 'Ngày quyết định',
            dataIndex: 'dayDecision',
            filters: [],
            onFilter: (value, record) => record.dayDecision.includes(value),
            filterSearch: true,
            width: 'auto',
            render: (date) => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Vị trí cũ',
            dataIndex: 'oldPosition',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.oldPosition.includes(value),
            width: 'auto',
        },
        ,
        {
            title: 'Số quyết định',
            dataIndex: 'decisionNumber',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.decisionNumber.includes(value),
            width: 'auto',
        },
        ,
        {
            title: 'Vị trí mới',
            dataIndex: 'newPosition',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.newPosition.includes(value),
            width: 'auto',
        },
        {
            title: 'Cán bộ',
            dataIndex: 'militaryName',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.newPosition.includes(value),
            width: 'auto',
        },
        {
            title: 'Đơn vị đến ',
            dataIndex: 'unitArrives',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.unitArrives.includes(value),
            width: 'auto',
        },
        {
            title: 'Đơn vị đi ',
            dataIndex: 'unitGo',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.unitGo.includes(value),
            width: 'auto',
        },
        {
            title: 'Thao tác',
            width: '108px',
            render: (record) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>
                <EyeOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => hanldDetailDecision(record.id)} />
                <EditOutlined style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} onClick={() => hanldEditDecision(record)} />
                <Popconfirm
                    title="Xóa ngôn ngữ này?"
                    onConfirm={() => handleDeleteDecision(record.id)}
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
        getDecision();
        getDataMilitary();
        getDataUnit();
    }, [totalCount]);

    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Quản lí quyết định</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách quyết định</Breadcrumb.Item>
                <Button
                    type="primary"
                    style={{ marginLeft: "auto" }}
                    onClick={showModalAdd}
                >
                    <PlusOutlined />
                    Đề cử
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
                    dataSource={decision}
                    onChange={onChange}
                    pagination={{ pageSize: 10 }}
                />
                <Modal
                    open={isModalOpen}
                    title={isStatusModal === "Add" ? "Đề xuất quyết định" : "Cập nhập ngôn ngữ "}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <DecisionModal dataMilitary={dataMilitary} dataUnit={dataUnit} onFinish={onFinish} />
                </Modal>

            </div>

        </>
    );
}

export default DecisionPage