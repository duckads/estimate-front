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
  getItem('Option 2', '1', <DesktopOutlined />)
];

export default function LayoutSider() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={ collapsed }
      onCollapse={ value => setCollapsed(value) }
    >
      <div className="demo-logo-vertical" style={{ height: '64px' }} />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={ items } />
    </Sider>
  )
}