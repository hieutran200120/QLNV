import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, Avatar, Drawer } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    BellOutlined,
    CommentOutlined,
    FileTextOutlined,
    SettingOutlined,
    UserOutlined,
    AreaChartOutlined,
    TeamOutlined,
    HomeOutlined,
    PartitionOutlined,
    SnippetsOutlined
} from '@ant-design/icons';
import '../../src/App.css'; // Assuming you have your CSS styles in App.css
import '../css/style.min.css'; // Custom styles
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const BREAKPOINT = 1000; // Kích thước màn hình nhỏ hơn giá trị này sẽ sử dụng Drawer
const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const handleResize = () => {
        if (window.innerWidth >= BREAKPOINT) {
            setDrawerVisible(false); // Đảm bảo đóng Drawer trên các màn hình lớn hơn breakpoint
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Xử lý ngay khi component được mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        if (window.innerWidth < BREAKPOINT) {
            setDrawerVisible(!drawerVisible);
        } else {
            setCollapsed(!collapsed);
        }
    };
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className={`sidebar ${drawerVisible ? 'sidebar-visible' : ''}`}
            >
                <div className="gx-sidebar-content">
                    <div className="gx-sidebar-notifications">
                        <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
                            <Avatar
                                src="/assets/images/avatar/domnic-harris.png"
                                size={40}
                                className="gx-mr-3"
                            />
                            <span className="gx-avatar-name">
                                Rob Farnandies
                                <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2"></i>
                            </span>
                        </div>
                        <ul className="gx-app-nav">
                            <li><SearchOutlined /></li>
                            <li><BellOutlined /></li>
                            <li><CommentOutlined /></li>
                        </ul>
                    </div>
                    <div className="gx-layout-sider-scrollbar">
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['3']}
                            style={{ height: '1000px', borderRight: 0 }}
                        >
                            <Menu.ItemGroup key="users" title="Quản lí" className="gx-menu-group">
                                <Menu.Item
                                    key="unit"
                                    icon={<HomeOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <NavLink to="/Home/Unit">Quản lí đơn vị</NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="changelog"
                                    icon={<UserOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <NavLink to="/Home/Military">Quản lí cán bộ</NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="installation"
                                    icon={<SettingOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <NavLink to="/Home/Relative">Quản lí thân nhân</NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="documents"
                                    icon={<FileTextOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <NavLink to="/Home/Decision">Quản lí quyết định</NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="language"
                                    icon={<SnippetsOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <NavLink to="/Home/ForeignLanguage">Quản lí ngoại ngữ</NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="roles"
                                    icon={<SnippetsOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <NavLink to="/Home/Role">Quản lí Quyền</NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="report"
                                    icon={<AreaChartOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <a href="/documents/installation">Báo cáo thống kê</a>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="users" title="Phân quyền" className="gx-menu-group">
                                <Menu.Item
                                    key="usergroups"
                                    icon={<TeamOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <NavLink to="/Home/GroupUser">Nhóm người dùng</NavLink>
                                </Menu.Item>
                                <Menu.Item
                                    key="user_role"
                                    icon={<PartitionOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <a href="/documents/changelog"> Tài khoản</a>
                                </Menu.Item>

                            </Menu.ItemGroup>
                        </Menu>
                    </div>
                </div>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleSidebar}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        maxHeight: '100%',
                        overflowY: 'auto',
                        background: '#fff',
                        borderRadius: '4px',
                    }}
                >
                    <Outlet />
                </Content>
                <Drawer
                    title="Navigation"
                    placement="left"
                    closable={false}
                    onClose={() => setDrawerVisible(false)}
                    visible={drawerVisible}
                    key="left"
                    className="ant-drawer-body"
                >
                    <div className="gx-layout-sider-scrollbar">
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['3']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.ItemGroup key="documents" title="Documents" className="gx-menu-group">
                                <Menu.Item
                                    key="changelog"
                                    icon={<FileTextOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <a href="/documents/changelog">Changelog</a>
                                </Menu.Item>
                                <Menu.Item
                                    key="installation"
                                    icon={<SettingOutlined />}
                                    style={{ paddingLeft: 24 }}
                                >
                                    <a href="/documents/installation">Installation</a>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            {/* Add more Menu.ItemGroup or Menu.Item here if needed */}
                        </Menu>
                    </div>
                </Drawer>
            </Layout>
        </Layout>
    )
}

export default AdminLayout