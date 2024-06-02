'use client';

import React, { useState } from 'react';
import { Layout, DatePicker, Table, Typography, Input, Row, Col } from 'antd';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

const { Header, Content } = Layout;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const sampleData = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
    { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const Page: React.FC = () => {
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [searchName, setSearchName] = useState<string>('');
    const [searchAge, setSearchAge] = useState<string>('');
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [filteredData, setFilteredData] = useState(sampleData);

    const onChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
        setDateRange(dates);
        // Here you can add logic to filter the table data based on the selected date range
    };

    const onSearch = () => {
        let data = sampleData;
        if (searchName) {
            data = data.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()));
        }
        if (searchAge) {
            data = data.filter(item => item.age.toString().includes(searchAge));
        }
        if (searchAddress) {
            data = data.filter(item => item.address.toLowerCase().includes(searchAddress.toLowerCase()));
        }
        setFilteredData(data);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={2} style={{ margin: 0 }}>Item List</Title>
                <RangePicker onChange={onChange} />
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div className="site-layout-background" style={{ padding: 24 }}>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <Input
                                placeholder="Search Name"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                onPressEnter={onSearch}
                            />
                        </Col>
                        <Col span={6}>
                            <Input
                                placeholder="Search Age"
                                value={searchAge}
                                onChange={(e) => setSearchAge(e.target.value)}
                                onPressEnter={onSearch}
                            />
                        </Col>
                        <Col span={6}>
                            <Input
                                placeholder="Search Address"
                                value={searchAddress}
                                onChange={(e) => setSearchAddress(e.target.value)}
                                onPressEnter={onSearch}
                            />
                        </Col>
                        <Col span={6}>
                            <Input.Search
                                placeholder="Search"
                                onSearch={onSearch}
                            />
                        </Col>
                    </Row>
                    <Table dataSource={filteredData} columns={columns} style={{ marginTop: 16 }} />
                </div>
            </Content>
        </Layout>
    );
};

export default Page;