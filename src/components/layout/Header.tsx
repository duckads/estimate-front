'use client';

import { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Typography } from 'antd';
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
        <Header
            style={{
                padding: '0 24px',
                background: 'blue',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Title level={3} style={{ color: 'white', margin: 0 }}>
                {title}
            </Title>
            <Dropdown overlay={userMenu(handleMenuClick)} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Avatar icon={<UserOutlined />} /> <DownOutlined />
                </a>
            </Dropdown>
        </Header>
    );
}