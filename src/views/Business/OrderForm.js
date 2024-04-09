import React, { useState, useEffect , useRef} from 'react';
import {
    Button,
    Col,
    Input,
    Row,
    Table,
    Typography,
    Space
} from 'antd';
import { CopyOutlined, SearchOutlined } from '@ant-design/icons';
const { Title } = Typography;

const data = [
    {
        key: '1',
        psDt: '2023-12-28',
        peDt: '2024-01-03',
        clientNm: '씨투 주식회사',
        clientManager: '실드 주식회사',
        handlingManager: '안성군 대리',
        projectNm: '풋살장 투명방음벽 설치',
        jobSt: '202001'
    }
];

const OrderFormList = () => {
    return (
        <>
            <Row>
                <Col span={24} style={{textAlign: 'left', height: '100%' }}>
                    <CopyOutlined style={{ fontSize: '24px' }}/>
                    <Title level={3} style={{ display: 'inline-block', marginLeft: '8px' }}>발주서 조회</Title>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div style={{ height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Space size='small'>
                            <Input placeholder="검색" suffix={<SearchOutlined />}/>
                            <Button type="primary">신규</Button>
                        </Space>
                    </div>
                </Col>
            </Row>
            <Table
                style={{ marginTop: 10, maxHeight:550, overflowX:"auto"}}
                size='small'
                columns={ [
                    { title: '발주번호', dataIndex: 'key', width: 80, align: 'center'  },
                    { title: '발주일자', dataIndex: 'psDt', width: 120, align: 'center'  },
                    { title: '납기일자', dataIndex: 'peDt', width: 100, align: 'center' },
                    { title: '수주처', dataIndex: 'clientNm', width: 100, align: 'center' },
                    { title: '수주처 담당자', dataIndex: 'clientManager', width: 180, align: 'center' },
                    { title: '실드 담당자', dataIndex: 'handlingManager', width: 180, align: 'center' },
                    { title: '프로젝트', dataIndex: 'projectNm', width: 100, align: 'center' },
                    { title: '진행상태', dataIndex: 'jobSt', width: 80, align: 'center'  },
                ]}
                dataSource={data}
            >
            </Table>
        </>
    );
};
export default OrderFormList;
