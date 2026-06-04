import RouteGuard from '@components/common/RouteGuard';
import AdminLayout from '@components/layout/AdminLayout';
import dashboardItems from '@data/dashboard-items.json';
import { Col, Row } from 'antd';
import { v4 as uuid } from 'uuid';
import DashboardItemCard from './DashboardItemCard';

export const metadata = {
  title: 'Dashboard',
};

export default function Dashboard() {
  return (
    <RouteGuard accessType='private'>
      <AdminLayout>
        <Row gutter={[24, 24]}>
          {dashboardItems?.map((item: any) => (
            <Col
              key={uuid()}
              xs={24}
              md={12}
              lg={8}
            >
              <DashboardItemCard
                title={item.title}
                description={item.description}
                imageURL={item.imageURL}
              />
            </Col>
          ))}
        </Row>
      </AdminLayout>
    </RouteGuard>
  );
}
