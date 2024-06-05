'use client';

import { useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { DesktopOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('대시보드', '1', <DesktopOutlined />),
  getItem('기초 정보', '2', <DesktopOutlined />, [
    getItem('외부 회사', '2-1'),
    getItem('외부 직원', '2-2'),
  ]),
  getItem('영업 관리', '3', <DesktopOutlined />, [
    getItem('프로젝트', '3-1'),
    getItem('견적서', '3-2'),
    getItem('발주서', '3-2'),
  ]),
  getItem('조직관리', '4', <DesktopOutlined />, [
    getItem('회사정보', '4-1'),
    getItem('직원관리', '4-2'),
    getItem('내 정보 수정', '4-1')
  ]),
  getItem('결제 관리', '2', <DesktopOutlined />),
];

export default function LayoutSider() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsed={ collapsed }
      style={{ backgroundColor: 'white' }}
    >
      <div className="logo"  style={{ height: '64px' }}>
        <img src="shield_logo.jpg" style={{ height: '64px', width: '200px'}} alt="가설 견적서 로고"/>
      </div>
      <Menu defaultSelectedKeys={['2']} mode="inline" items={ items } />
    </Sider>
  )
}