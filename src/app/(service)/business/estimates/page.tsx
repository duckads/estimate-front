'use client';

import React, {useEffect, useState} from 'react';
import { Layout, DatePicker, Table, Typography, Input, Row, Col } from 'antd';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { fetchDataWithToken } from '@/lib/request';
import {METHOD} from "@/lib/apis";

const { Header, Content } = Layout;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const sampleData = [
    { key: '1', estimateSeq: '2', orderCom: '한성', orderMgrNm: '박지성', mgrNm:'안성재', regDt:'2024-05-12', type:'공사'},
];

const columns = [
    {
        title: '견적 번호',
        dataIndex: 'estimateSeq',
        key: 'estimateSeq',
    },
    {
        title: '발주처',
        dataIndex: 'orderCom',
        key: 'orderCom',
    },
    {
        title: '발주처 담당자',
        dataIndex: 'orderMgrNm',
        key: 'orderMgrNm',
    },
    {
        title: '내부 담당자',
        dataIndex: 'mgrNm',
        key: 'mgrNm',
    },
    {
        title: '견적일자',
        dataIndex: 'regDt',
        key: 'regDt',
    },
    {
        title: '견적구분',
        dataIndex: 'type',
        key: 'type',
    },
];

const Page: React.FC = () => {

    const [filteredData2, setFilteredData2] = useState([]);

    // "where": [
    //     {
    //         "field": "reg_dt",
    //         "operation": "between",
    //         "value": [
    //             "2020-01-01",
    //             "2026-01-17"
    //         ]
    //     }
    // ],
    //     "pageIdx": "0",
    //     "pageSize": "5"


    useEffect(() => {
        // Fetch data when component mounts
        const fetchDataOnMount = async () => {
            try {
                const fetchedData = await fetchDataWithToken('/estimates', {}, METHOD.POST, { where: [{field: 'reg_dt', operation: 'between', value: ['2020-01-01', '2026-01-17']}], pageIdx: 1, pageSize: 10}); // Adjust endpoint and method accordingly
                setFilteredData2(fetchedData);
                console.log(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataOnMount();

        // Cleanup function (optional)
        return () => {
            // Cleanup logic if needed
        };
    }, []);











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
            data = data.filter(item => item.estimateSeq.toLowerCase().includes(searchName.toLowerCase()));
        }
        if (searchAge) {
            data = data.filter(item => item.orderMgrNm.toString().includes(searchAge));
        }
        if (searchAddress) {
            data = data.filter(item => item.orderMgrNm.toLowerCase().includes(searchAddress.toLowerCase()));
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