import React, { useState, useEffect } from 'react'
import { militaryApi } from '../../api/militaryApi';
import { useParams } from 'react-router-dom';
import { Table, Breadcrumb, Button } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';
const UnitDetailPage = () => {
    const [dataMilitary, setdataMilitary] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { id } = useParams();
    // gọi cán bộ theo từng đơn vị
    const getMilitarytoUnit = async () => {
        try {
            const res = await militaryApi.get({
                Limit: currentPage,
                PageIndex: rowsPerPage,
                Unit_id: id
            });
            if (res) {
                setdataMilitary(res.items);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //xuất ra file excel
    const exportToExcel = async () => {
        if (!dataMilitary || dataMilitary.length === 0) {
            console.error('No data to export');
            return;
        }
        try {
            // Tạo một workbook mới
            const wb = XLSX.utils.book_new();
            // Chuyển đổi dữ liệu JSON thành một sheet
            const ws = XLSX.utils.json_to_sheet(dataMilitary);
            // Thêm sheet vào workbook
            XLSX.utils.book_append_sheet(wb, ws, 'MilitaryData');
            // Chuyển đổi workbook thành buffer Excel
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            // Tạo Blob từ buffer
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            // Lưu Blob thành file Excel
            saveAs(blob, 'MilitaryData.xlsx');
            console.log('Export successful!');
        } catch (error) {
            console.error('Failed to export data:', error);
        }
    };
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
        }

    ];

    useEffect(() => {
        getMilitarytoUnit();
    }, [id, currentPage, rowsPerPage]);

    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Danh sách cán bộ</Breadcrumb.Item>
                <Button
                    type="primary"
                    style={{ marginLeft: "auto" }}
                    onClick={exportToExcel}
                >
                    Xuất ra Excel
                </Button>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,

                }}
            >
                <Table
                    columns={columns}
                    dataSource={dataMilitary}
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: rowsPerPage,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30', '100'],
                        showTotal: (total) => `Tổng số: ${total}`,
                    }}
                    scroll={{ y: 400 }}
                />
            </div>
        </>
    );
};

export default UnitDetailPage