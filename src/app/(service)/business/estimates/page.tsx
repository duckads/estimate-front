'use client';

import React, { useEffect, useState } from 'react';
import { Layout, DatePicker, Table, Typography, Input, Row, Col, Dropdown, Button, Menu, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs'; // Ensure dayjs is correctly imported
import 'dayjs/locale/ko';
import { fetchDataWithToken } from '@/lib/request';
import { METHOD } from "@/lib/apis";

const { Header, Content } = Layout;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const columns = [
    {
        title: '견적 번호',
        dataIndex: 'seq',
        key: 'seq',
    },
    {
        title: '발주처',
        dataIndex: 'customerCom',
        key: 'customerCom',
    },
    {
        title: '발주처 담당자',
        dataIndex: 'customerMgr',
        key: 'customerMgr',
    },
    {
        title: '내부 담당자',
        dataIndex: 'estimateMgr',
        key: 'estimateMgr',
    },
    {
        title: '견적일자',
        dataIndex: 'updDt',
        key: 'updDt',
    },
    {
        title: '견적구분',
        dataIndex: 'type',
        key: 'type',
    },
];

const Page: React.FC = () => {
    const getDefaultDates = () => {
        const end = dayjs();
        const start = end.subtract(3, 'month');
        return { startDateState: start, endDateState: end };
    };

    const { startDateState, endDateState } = getDefaultDates();
    const [startDate, setStartDate] = useState(startDateState.format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(endDateState.format('YYYY-MM-DD'));

    const [tableData, setTableData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const [pageIdx, setPageIdx] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchSeq, setSearchSeq] = useState<string>('');

    const fetchData = async (pageNumber: number, pageSize: number) => {
        try {
            const bodyJson = {
                where: [{ field: 'reg_dt', operation: 'between', value: [startDate, endDate] }],
                pageIdx: pageNumber,
                pageSize: pageSize
            };

            const fetchedData = await fetchDataWithToken('/estimates', {}, METHOD.POST, bodyJson);

            const tempTableData = fetchedData.content.map(item => {
                return {
                    seq: item.seq,
                    customerCom: item.customer_com.name,
                    customerMgr: item.customer_mgr.name,
                    estimateMgr: item.estimate_mgr.name,
                    updDt: item.upd_dt.substring(0, 10),
                    type: item.estimate_tp === '104002' ? '공사' : '납품'
                };
            });

            setTableData(tempTableData);
            setPagination({
                current: fetchedData.page_number,
                pageSize: fetchedData.page_size,
                total: fetchedData.total_elements,
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [startDate, endDate, pagination.current, pagination.pageSize]);

    const onChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
        if (dates) {
            const [startDt, endDt] = dates;
            // startDt와 endDt를 문자열로 변환
            const formattedStartDt = startDt?.format('YYYY-MM-DD') || ''; // startDt가 null이 아닌지 확인하여 null-safe한 접근 방식 사용
            const formattedEndDt = endDt?.format('YYYY-MM-DD') || ''; // endDt가 null이 아닌지 확인하여 null-safe한 접근 방식 사용

            setStartDate(formattedStartDt);
            setEndDate(formattedEndDt);
        }
    };

    const onSearch = () => {
        let data = tableData;
        if (searchSeq && !isNaN(Number(searchSeq))) {
            data = data.filter(item => item.seq.toString().includes(searchSeq));
        }
        setTableData(data);
    };

    const clearFilters = () => {
        setStartDate('2020-01-01');
        setEndDate('2026-01-17');
        setSearchSeq('');
        // Fetch the original data again
        fetchDataOnMount();
    };

    const handleTableChange = (pagination) => {
        fetchData(pagination.current, pagination.pageSize);
    };

    const menu = (
        <Menu>
            <Menu.Item key="1">
                공사
            </Menu.Item>
            <Menu.Item key="2">
                납품
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#f5f5f5', padding: '0 24px' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={2} style={{ margin: 0 }}>Item List</Title>
                    </Col>
                    <Col>
                        <RangePicker
                            onChange={onChange}
                            defaultValue={[startDateState, endDateState]}
                            style={{ marginLeft: '16px' }}
                        />
                    </Col>
                </Row>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div className="site-layout-background" style={{ padding: 24 }}>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col span={12}>
                            <Space>
                                <Input
                                    placeholder="견적서 번호"
                                    value={searchSeq}
                                    onChange={(e) => setSearchSeq(e.target.value)}
                                    onPressEnter={onSearch}
                                />
                                <Button onClick={onSearch}>검색</Button>
                                <Button onClick={clearFilters}>초기화</Button>
                            </Space>
                        </Col>
                        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <Button type="primary">신규 생성</Button>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Table
                        dataSource={tableData}
                        columns={columns}
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: pagination.total,
                            showSizeChanger: true,
                        }}
                        onChange={handleTableChange}
                        style={{ marginTop: 16 }}
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default Page;