import LayoutFooter from '@/components/layout/Footer';
import LayoutSider from '@/components/layout/SIder';
import { auth } from '@/lib/auth';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { SessionProvider } from 'next-auth/react';

export default async function ServiceLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={ session }>
      <Layout style={{ minHeight: '100vh' }}>
        <LayoutSider />
        <Layout>
          <Header></Header>
          <Content style={{ margin: '0 16px' }}>
            { children }
          </Content>
          <LayoutFooter />
        </Layout>
      </Layout>
    </SessionProvider>
  );
}