import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { CopyOutlined, SearchOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Input,
    Row,
    Table,
    Typography,
    Space
} from 'antd';
import RestApi from "../../utils/restApi";
const { Title } = Typography;


//justify 가로축 정렬, align 세로축 정렬
//justifyContent: 'flex-end', alignItems: 'flex-end' justifyContent, alignItems(가로, 세로)
// 버튼끼리 공간을 주고 싶다면 SPACE
const EstimateTable = () => {
    const history = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tableOption, setTableOption] = useState({
        columns: [
            { title: '견적번호', dataIndex: 'estimateCode', width: 80, align: 'center', key: 'seq', sorter: true },
            { title: '견적이름', dataIndex: 'estimateNm', width: 120, align: 'center'},
            { title: '견적일자', dataIndex: 'estimateStartDt', width: 100,   align: 'center'},
            { title: '발주처', dataIndex: 'clientNm', width: 100, align: 'center' },
            { title: '발주처 담당자', dataIndex: 'producerSeq', width: 100, align: 'center'},
            { title: '실드 담당자', dataIndex: 'memberNm', width: 100, align: 'center'},
            { title: '프로젝트', dataIndex: 'projectNm', width: 100, align: 'center' },
            { title: '진행상태', dataIndex: 'actSt', width: 80, align: 'center' }
        ],
        pagination :  {
            current: 1,
            defaultCurrent: 1,
            pageSize: 10,
            total: 0,
            pageSizeOptions: ['5', '10', '20', '30', '50', '100', '500', '1000'],
            sort_field : "",
            sort_direction: "",
            showSizeChanger: true
        }
    });

    const getEstimateList = async () => {
        try {
            const member = await RestApi('member', 'GET');
            const result = await RestApi('estimates', 'GET');
            let estimateList = [];
            result.forEach(item => {
                const parsedData = JSON.parse(item.estimate_option);
                const memberNm = member.find(memberItem => item.member_seq == memberItem.seq);
                let actSt;

                if (item.act_st === '201001') actSt = '대기'
                if (item.act_st === '201002') actSt = '진행'
                if (item.act_st === '201009') actSt = '완료'

                estimateList.push({
                    key: item.seq,
                    estimateCode: 
                        <Link to={{pathname:`/console/estimatedtl/${item.seq}`, state: { id: item.seq }}}>{item.estimate_code}</Link>,
                    estimateNm: item.estimate_nm,
                    estimateStartDt: parsedData.start_dt,
                    clientNm: '',
                    producerSeq: '',
                    memberNm: memberNm.member_nm,
                    projectNm: '',
                    actSt: actSt
                })
            });
            setTableOption({
                ...tableOption,
                pagination:{
                    ...tableOption.pagination,
                }
            });
            setTableData(estimateList);
        } catch (error) {
            // 에러 처리 로직 추가
            console.error('Error in fetching data:', error);
        } finally {

        }
    };

    useEffect(() => {
        getEstimateList();
      }, []);

    return (
        <>
            <Row>
                <Col span={24} style={{textAlign: 'left', height: '100%' }}>
                    <CopyOutlined style={{ fontSize: '24px' }}/>
                    <Title level={3} style={{ display: 'inline-block', marginLeft: '8px' }}>견적서 조회</Title>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div style={{ height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Space size='small'>
                            <Input placeholder="검색" suffix={<SearchOutlined />}/>
                            <Button type="primary">납품 신규</Button>
                            <Button type="default">공사 신규</Button>
                        </Space>
                    </div>
                </Col>
            </Row>
            <Table
                style={{ marginTop: 10, maxHeight:550, overflowX:"auto"}}
                size='small'
                columns={tableOption.columns}
                dataSource={tableData}
            >
            </Table>
        </>
    );
};
export default EstimateTable;
