'use client';

import React, { useState } from 'react';
import { Layout, DatePicker, Row, Col } from 'antd';
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
);

const { Header, Content } = Layout;

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const barData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.6)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const pieData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const doughnutData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const radarData = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'rgba(75,192,192,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const DashboardPage: React.FC = () => {
  const [date, setDate] = useState<string | null>(null);

  const onChange = (date: Dayjs | null, dateString: string) => {
    setDate(dateString);
  };

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Dashboard</h2>
          <DatePicker onChange={onChange} />
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Line data={lineData} />
              </Col>
              <Col span={8}>
                <Bar data={barData} />
              </Col>
              <Col span={8}>
                <Pie data={pieData} />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Doughnut data={doughnutData} />
              </Col>
              <Col span={12}>
                <Radar data={radarData} />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
  );
};

export default DashboardPage;