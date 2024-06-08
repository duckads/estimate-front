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
            <Header style={{ height: '96px', padding: '24px 0 0 27px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="page-title" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '30px' }}>
                    <div className="title-text" style={{ display: 'flex', alignItems: 'center' }}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '24px', height: '24px', marginRight: '8px' }}>
                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                        견적서 관리
                    </div>
                    <div className="title-calendar" style={{ textAlign: 'right', paddingRight: '20px' }}>
                        <RangePicker
                            onChange={onChange}
                            defaultValue={[dayjs(startDateState), dayjs(endDateState)]}
                            style={{ width: '200px', marginLeft: '5px' }}
                        />
                    </div>
                </div>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div className="site-layout-background" style={{ padding: 10 }}>
                    <Table
                        dataSource={tableData}
                        columns={columns}
                        title={() => (
                            <div>
                                <Row style={{ rowGap: '0px' }}>
                                    <Col span={12} style={{ textAlign: 'left' }}>
                                        <Dropdown overlay={menu} trigger={['click']}>
                                            <Button type="primary"  style={{ borderRadius: 0 }}>견적서 등록</Button>
                                        </Dropdown>
                                        <Button style={{ marginLeft: '5px', borderRadius: 0 }}>삭제</Button>
                                    </Col>
                                    <Col span={12} style={{ textAlign: 'right' }}>
                                        <Button style={{ display: 'inline-block', marginLeft: '5px', borderRadius: 0 }}>다운로드</Button>
                                    </Col>
                                </Row>
                            </div>
                        )}

                        pagination={tableData.length > 0 ? {
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: pagination.total,
                            showSizeChanger: true,
                        } : false}
                        locale={{ emptyText: '데이터가 없습니다' }}
                        onChange={handleTableChange}
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default Page;