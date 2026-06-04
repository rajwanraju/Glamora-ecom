'use client';

import { PieChartOutlined } from '@ant-design/icons';
import useMediaQuery from '@hooks/useMediaQuery';
import cn from '@utils/cn';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MyFooter from './MyFooter';
import Navbar from './Navbar';

const { Sider, Content, Footer, Header } = Layout;

export default function AdminLayout({ children }: { readonly children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // if mobile device to collapse sidebar
  useEffect(() => {
    if (!isDesktop) {
      setCollapsed(true);
    }

    return () => {
      setCollapsed(false);
    };
  }, [isDesktop]);

  return (
    <>
      <Header className='sticky top-0 z-[100] !h-[80px] lg:!h-[100px]'>
        <Navbar />
      </Header>

      <Layout hasSider>
        <Sider
          className='transition-transform duration-300 ease-in-out'
          collapsed={collapsed}
          trigger={null}
          collapsible
          width={250}
          style={{
            background: colorBgContainer,
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: isDesktop ? 100 : 80,
            bottom: 0,
            zIndex: 2,
          }}
        >
          <ConfigProvider theme={{ token: { borderRadius: 0 } }}>
            <Menu
              theme='light'
              mode='inline'
              className='font-font-semi-bold text-[16px] opacity-100'
              defaultSelectedKeys={[pathname?.split('/')[2] || 'dashboard']}
              onSelect={({ key }) => router.push(key)}
              items={[
                {
                  key: 'dashboard',
                  icon: <PieChartOutlined />,
                  label: 'Dashboard',
                },
              ]}
            />
          </ConfigProvider>
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
          <Content
            style={{
              background: colorBgContainer,
              boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)',
              minHeight: isDesktop ? 'calc(100vh - 250px)' : 'calc(100vh - 200px)',
              overflow: 'auto',
              margin: isDesktop ? '16px 16px' : '8px 8px',
              padding: isDesktop ? 20 : 10,
            }}
          >
            {children}
          </Content>

          <Footer
            style={{
              background: colorBgContainer,
              boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)',
              padding: '0 16px',
            }}
          >
            <MyFooter className={cn('!bg-white', isDesktop ? 'min-h-[118px]' : 'min-h-[103px]')} />
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
