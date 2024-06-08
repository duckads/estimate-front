'use client';

import { useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { DesktopOutlined, DashboardOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    href?: string // Added href property
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    href // Added href to the return object
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('대시보드', '1', <DashboardOutlined />, undefined, '/dashboard'),
  getItem('기초 정보', '2', <DesktopOutlined />, [
    // MenuProps('외부 회사', '2-1', undefined, undefined,'/info/external-company'),
    getItem('외부 직원', '2-2', <DesktopOutlined />, undefined,'/info/external-staff'),
  ]),
  getItem('영업 관리', '3', <DesktopOutlined />, [
    // getItem('프로젝트', '3-1', undefined, '/sales/project'),
    getItem('견적서', '3-2', <DesktopOutlined />, undefined,'/business/estimates'),
    // getItem('발주서', '3-2', undefined, '/sales/order'),
  ]),
  getItem('조직관리', '4', <DesktopOutlined />, [
    // getItem('회사정보', '4-1', undefined, '/organization/company-info'),
    // getItem('직원관리', '4-2', undefined, '/organization/staff-management'),
    // getItem('내 정보 수정', '4-1', undefined, '/organization/my-info'),
  ]),
  getItem('결제 관리', '5', <MoneyCollectOutlined />, undefined, '/payment-management'),
];

export default function LayoutSider() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleClick: MenuProps['onClick'] = (e) => {
    const { key, item } = e;
    const href = (item as any).props.href;
    if (href) {
      router.push(href);
    }
  };

  return (
      <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
          style={{ backgroundColor: 'white' }}
      >
        <div className="logo" style={{ height: '64px' }}>
          <img src="/shield_logo.png" style={{ height: '64px', width: '200px' }} alt="가설 견적서 로고" />
        </div>
        <Menu
            defaultSelectedKeys={['2']}
            mode="inline"
            items={items}
            onClick={handleClick} // Added onClick handler
        />
      </Sider>
  );
}
