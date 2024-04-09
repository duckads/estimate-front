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
        projectNm: '풋살장 투명방음벽 설치',
        clientNm: '하나종합건설',
        clientManager: '오덕규 지사장',
        handlingManager: '안성군',
        jobSt: '202001'
    }
];

//justify 가로축 정렬, align 세로축 정렬
//justifyContent: 'flex-end', alignItems: 'flex-end' justifyContent, alignItems(가로, 세로)
// 버튼끼리 공간을 주고 싶다면 SPACE
const ProjectList = () => {
    return (
        <>
            <Row>
                <Col span={24} style={{textAlign: 'left', height: '100%' }}>
                    <CopyOutlined style={{ fontSize: '24px' }}/>
                    <Title level={3} style={{ display: 'inline-block', marginLeft: '8px' }}>프로젝트 조회</Title>
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
                    { title: '프로젝트번호', dataIndex: 'key', width: 80, align: 'center'  },
                    { title: '프로젝트명', dataIndex: 'projectNm', width: 120, align: 'center'  },
                    { title: '발주처', dataIndex: 'clientNm', width: 100, align: 'center' },
                    { title: '발주처 담당자', dataIndex: 'clientManager', width: 100, align: 'center' },
                    { title: '실드 담당자', dataIndex: 'handlingManager', width: 180, align: 'center' },
                    { title: '진행상태', dataIndex: 'jobSt', width: 80, align: 'center'  },
                ]}
                dataSource={data}
            >
            </Table>
        </>
    );
};
export default ProjectList;
