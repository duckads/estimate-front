'use client';

import { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Typography, Breadcrumb } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const userMenu = (onMenuClick: (key: string) => void) => (
    <Menu onClick={({ key }) => onMenuClick(key)}>
        <Menu.Item key="profile">
            <a href="#profile">Profile</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
            <a href="#logout">Logout</a>
        </Menu.Item>
    </Menu>
);

export default function LayoutHeader() {
    const [title, setTitle] = useState('Main Title');

    const handleMenuClick = (key: string) => {
        if (key === 'profile') {
            setTitle('Title 1');
        } else if (key === 'logout') {
            setTitle('Title 2');
        }
    };

    return (
        <Header style={{ height: '56px', padding: '0 24px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #d6d6d6' }}>
            <div className="ant-breadcrumb" style={{ marginTop: '20px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item>견적서 시스템</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">영업 관리</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">견적서 조회</a></Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Dropdown overlay={userMenu(handleMenuClick)} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Avatar icon={<UserOutlined />} /> <DownOutlined />
                </a>
            </Dropdown>
        </Header>

    );
}