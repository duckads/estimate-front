import React, { useState, useEffect , useRef} from 'react';
import RestApi from "../../utils/restApi";
import {
    Typography,
    Tabs,
    Table,
    Col,
    Row,
    Card,
    Button,
    Input,
    Select,
    theme,
} from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import StickyBox from 'react-sticky-box';
import transImg from '../../assets/img/continence/trans.png';
import steelImg from '../../assets/img/continence/steel.jpeg';
import rppImg from '../../assets/img/continence/rpp.png';
import egiImg from '../../assets/img/continence/egi.png';
import beam2Img from '../../assets/img/continence/beam2.png';
import pipe5Img from '../../assets/img/continence/pipe5.png';
import { Icon } from '@iconify/react';

import { useParams } from 'react-router-dom';

const { Title } = Typography;

const EstimateDtl = (props) => {
    const [tableData, setTableData] = useState([]);
    const [initialItems, setInitialItems] = useState([]);

    //탭 설정 시작, initialItems[0].key
    const [activeKey, setActiveKey] = useState([]);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);
    const [rowSelection, setRowSelection] = useState({});
    const { id } = useParams();
    const [dataSource, setDataSource] = useState([]);

    const [orderer, setOrderer] = useState({});//발주처
    const [ordererManager, setOrdererManager] = useState({});//발주처 담당자
    const [producer, setProducer] = useState({});//공급자
    const [estimator, setEstimator] = useState({});//견적 담당자
    const [estimateDate, setEstimateDate] = useState({}); //



    const items2 = new Array(2).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
            label: i === 0 ? '간단 견적(simple)' : '상세 견적(detail)',
            key: id
        };
    });

    const getEstimateDtl = async () => {
        try {

            const member = await RestApi('member', 'GET');
            const result = await RestApi(`estimates/${id}`, 'GET');

            console.log(result);

            if (result.estimate_tp === '104002') {
                console.log("납품 견적서 입니다.");
            } else {
                console.log("공사 견적서 입니다.");
            }

            let tabData = [{
                label: '갑지',
                key: '0',
                closable: false,
            }];

            //발주처
            setOrderer({
                companyNm: '대흥에코',
                companyPhoneNumber: '010-2604-1308',
                companyFax: '02-934-3235',
                companyEmail: 'asj@bizspring.co.kr'
            })

            //발주처 담당자
            setOrdererManager({
                name: '대흥 에커 담당자',
                phone: '010-2564-2413',
                email: 'koon@naver.com'
            })

            const estimateOption = JSON.parse(result.estimate_option);

            //견적 일자 날짜
            setEstimateDate({
                estimateDate: estimateOption.start_dt,
                estimateExpireDt: estimateOption.expir_dt,
                estimatePay: estimateOption.payment_tp,
                estimatePlace: ''
            })

            //공급자
            setProducer({
                companyNm: '실드 주식회사',
                companyPhoneNumber: '02-2269-1233',
                companyFax: '02-2285-1236',
                companyAddress: '경기도 양주시 백석읍 중앙로 287',
                companyService: '제조업,건설업 외',
                companyType: '건설기자재,방음벽 외',
                companyEmail: 'sales@shield-korea.com',
            })

            //견적 담당자
            const estimator = member.find(memberItem => result.member_seq == memberItem.seq);
            estimator.phone = JSON.parse(estimator.member_option).phone;
            setEstimator(estimator);

            let tempDataSource = [];

            result.estimate_dtl.forEach((item, index) => {
                tabData.push({
                    label: index+1 + 'page',
                    key: index+1,
                    closable: false
                });

                tempDataSource.push({
                    key: index,
                    prodctNm: result.estimate_nm,
                    size: item.product_size,
                    quantity: item.product_quantity,
                    type: item.product_unit,
                    price: item.product_price,
                    price2: item.product_supply_price,
                    etc: item.product_note,
                });
            });
            setDataSource(tempDataSource);
            setInitialItems(tabData);
        } catch (error) {
            // 에러 처리 로직 추가
            console.error('Error in fetching data:', error);
        } finally {

        }
    };

    useEffect(() => {
        getEstimateDtl().then(r => {});
    }, []);

    useEffect(() => {
        if (initialItems.length > 0) {
            setActiveKey(initialItems[0].key);
            setItems(initialItems);
        }
    }, [initialItems]);

    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const add = () => {
        if (newTabIndex.current === 0) {
            newTabIndex.current = initialItems.length;
        } else {
            newTabIndex.current += 1;
        }
        const newActiveKey = newTabIndex.current;
        const newPanes = [...items];
        newPanes.push({
            label: `${newTabIndex.current}page`,
            key: newActiveKey,
        });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    //탭 설정 종료

    //표 설정 시작
    const tableProps = {
        rowSelection
    };

    const columns = [
        {
            title: '품명',
            dataIndex: 'prodctNm',
            key: 'prodctNm',
        },
        {
            title: '규격',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: '수량',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: '단위',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '단가',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '공급가액',
            dataIndex: 'price2',
            key: 'price2',
        },
        {
            title: '비고',
            dataIndex: 'etc' ,
            key: 'etc',
        }
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const renderTabBar = (props, DefaultTabBar) => (
        <StickyBox
            offsetTop={0}
            offsetBottom={20}
            style={{
                zIndex: 1,
            }}
        >
            <DefaultTabBar
                {...props}
                style={{
                    background: colorBgContainer,
                }}
            />
        </StickyBox>
    )

    //표 설정 종료
    return (
        <>
            <Card
                style={{
                    marginBottom: '15px',
                    textAlign: 'left'
                }}
            >
                <Input placeholder="견적서 제목을 입력해주세요" style={{width: '350px', marginRight: '5px'}}/>
                <Select
                    defaultValue="202001"
                    style={{
                        width: 70,
                        marginRight: '5px'
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: '202001',
                            label: '대기',
                        },
                        {
                            value: '202002',
                            label: '진행',
                        },
                        {
                            value: '202901',
                            label: '만료',
                        },
                    ]}
                />
                <Select
                    showSearch
                    style={{
                        width: 200,
                        marginRight: '5px'
                    }}
                    placeholder="프로젝트를 선택해주세요"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: 'A002 프로젝트 공사',
                        },
                        {
                            value: '2',
                            label: 'Closed',
                        },
                        {
                            value: '3',
                            label: 'Communicated',
                        },
                        {
                            value: '4',
                            label: 'Identified',
                        },
                        {
                            value: '5',
                            label: 'Resolved',
                        },
                        {
                            value: '6',
                            label: 'Cancelled',
                        },
                    ]}
                />
                <Button type={'primary'} size={'default'} style={{background: 'green'}}><CheckOutlined />신규/저장</Button>
            </Card>


            {/*갑지 탭 시작*/}
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
            />
            <Button
                type={'primary'}
                size={'small'}
                style={{
                    marginBottom: '10px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'left'
                }}
            >
                수량산출
            </Button>

            <h2
                style={{
                    color: '#8373e6',
                    fontSize: '20px',
                    fontWeight: '800'
                }}
            >
                선택 1:설치 타입
            </h2>
            <div>
                <label
                    style={{ display: 'inline-block'}}
                >
                    <input
                        type="radio"
                        value="option1"
                        style={{display: 'none'}}
                    />
                    <div className="pipe-box1">
                        <div className="pipe-box2">
                            <div className="pipe-circle">
                                <Icon icon="bx:check" className="pipe-check"/>
                            </div>
                            <img className="pipe-image" src={pipe5Img} alt="Option 1\2" />
                            <h3 className="pipe-text"> 파이프 타입 </h3>
                        </div>
                    </div>
                </label>
                <label
                    style={{ display: 'inline-block'}}
                >
                    <input
                        type="radio"
                        value="option2"
                        style={{display: 'none'}}
                    />
                    <div className="pipe-box1">
                        <div className="pipe-box2">
                            <div className="pipe-circle">
                                <Icon icon="bx:check" className="pipe-check"/>
                            </div>
                            <img className="pipe-image" src={beam2Img} alt="Option 1\2" />
                            <h3 className="pipe-text"> H빔 타입 </h3>
                        </div>
                    </div>
                </label>
            </div>

            <h2
                style={{
                    color: '#8373e6',
                    fontSize: '20px',
                    fontWeight: '800'
                }}
            >
                선택 2: 방음판
            </h2>
            <div>
                <label
                    style={{ display: 'inline-block'}}
                >
                    <input
                        type="radio"
                        value="option1"
                        style={{display: 'none'}}
                    />
                    <div className="pipe-box1">
                        <div className="pipe-box2">
                            <div className="pipe-circle">
                                <Icon icon="bx:check" className="pipe-check"/>
                            </div>
                            <img className="pipe-image" src={rppImg} alt="Option 1\2" />
                            <h3 className="pipe-text"> RPP방음벽 </h3>
                        </div>
                    </div>
                </label>
                <label
                    style={{ display: 'inline-block'}}
                >
                    <input
                        type="radio"
                        value="option2"
                        style={{display: 'none'}}
                    />
                    <div className="pipe-box1">
                        <div className="pipe-box2">
                            <div className="pipe-circle">
                                <Icon icon="bx:check" className="pipe-check"/>
                            </div>
                            <img className="pipe-image" src={egiImg} alt="Option 1\2" />
                            <h3 className="pipe-text"> EGI휀스 </h3>
                        </div>
                    </div>
                </label>
                <label
                    style={{ display: 'inline-block'}}
                >
                    <input
                        type="radio"
                        value="option2"
                        style={{display: 'none'}}
                    />
                    <div className="pipe-box1">
                        <div className="pipe-box2">
                            <div className="pipe-circle">
                                <Icon icon="bx:check" className="pipe-check"/>
                            </div>
                            <img className="pipe-image" src={steelImg} alt="Option 1\2" />
                            <h3 className="pipe-text"> 스틸방음벽 </h3>
                        </div>
                    </div>
                </label>
                <label
                    style={{ display: 'inline-block'}}
                >
                    <input
                        type="radio"
                        value="option2"
                        style={{display: 'none'}}
                    />
                    <div className="pipe-box1">
                        <div className="pipe-box2">
                            <div className="pipe-circle">
                                <Icon icon="bx:check" className="pipe-check"/>
                            </div>
                            <img className="pipe-image" src={transImg} alt="Option 1\2" />
                            <h3 className="pipe-text"> 투명방음벽 </h3>
                        </div>
                    </div>
                </label>
            </div>

            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} items={items2} id={'calc-tab'}>
            </Tabs>

            <Card>
                <Row>
                    <Col className={'calc-input-title'}>시공길이</Col>
                    <Col className={'calc-input-box'}><input className={'calc-input'}/>m</Col>
                </Row>
                <Row>
                    <Col className={'calc-input-title'}>RPP</Col>
                    <Col className={'calc-input-box'}><input className={'calc-input'} placeholder={'높이'}/>m</Col>
                    <Col className={'calc-input-box'}><select className={'calc-select'}></select></Col>
                    <Col className={'calc-input-box'}><select className={'calc-select'}></select></Col>
                </Row>
                <Row>
                    <Col className={'calc-input-title'}>분진망</Col>
                    <Col className={'calc-input-box'}><input className={'calc-input'}/>m<input type={'checkbox'}/></Col>
                </Row>
                <Row>
                    <Col className={'calc-input-title'}>RPP</Col>
                    <Col className={'calc-input-box'}><input className={'calc-input'}/>단</Col>
                </Row>
                <Row>
                    <Col className={'calc-input-title'}>주주길이</Col>
                    <Col className={'calc-input-box'}><input className={'calc-input'} placeholder={'높이'}/>m</Col>
                    <Col className={'calc-input-title'}>보조길이</Col>
                    <Col className={'calc-input-box'}><input className={'calc-input'} placeholder={'높이'}/>m</Col>
                </Row>
                <Row>
                    <Col className={'calc-input-title'}>경간</Col>
                    <Col className={'calc-input-box'}><input className={'calc-input'} placeholder={'높이'}/>m</Col>
                    <Col className={'calc-input-box'}><select className={'calc-select'}></select></Col>
                </Row>
                <Row>
                    <Col className={'calc-input-title'}>말뚝길이</Col>
                    <Col className={'calc-input-box'}><input className={'calc-input'}/>m</Col>
                </Row>
                <Row>
                    <Col className={'calc-input-title'}>파이프</Col>
                    <Col className={'calc-input-box'}><select className={'calc-select'}></select></Col>
                    <Col className={'calc-input-box'}><select className={'calc-select'}></select></Col>
                </Row>
                <Row>
                    <Col className={'calc-input-title'}>연결핀,클램프</Col>
                    <Col className={'calc-input-box'}><select className={'calc-select'}></select></Col>
                </Row>
                <Button
                    className={'calc-submit-button'}
                    type={'primary'}
                    size={'default'}
                    style={{marginTop: '35px', marginBottom: '40px'}}
                >수량 산출</Button>
            </Card>

            <Card>
                <Row className={'estimate-row'}>
                    <Col span={2} style={{textAlign: 'center', height: '50px', background: 'white'}}>
                        <Col className={'estimate-head'} style={{height: '50%'}}>견적번호</Col>
                        <Col className={'estimate-head'} style={{height: '50%', background: 'white'}}>2312B283</Col>
                    </Col>
                    <Col span={22} className={'estimate-head'} style={{height: '50px', background: 'white'}}>
                        견적서
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'center', height: '25px', background: 'white'}}> {/*여백1*/}
                    </Col>
                </Row>

                <Row className={'estimate-row'}>
                    <Col span={11} style={{textAlign: 'center'}}>
                        <Col className={'estimate-head'} style={{height: '25px'}}>발주처</Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>회사명</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}></Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>전화</Col><Col span={7} className={'estimate-content'} style={{height:'100%'}}></Col>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>팩스</Col><Col span={7} className={'estimate-content'} style={{height:'100%'}}></Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>회사이메일</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}></Col>
                            </Row>
                        </Col>
                        <Col style={{height: '25px', background: 'white'}}></Col>
                        <Col className={'estimate-head'} style={{height: '25px'}}>발주처 담당자</Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>성함</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}></Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>전화번호</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}></Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>이메일</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}></Col>
                            </Row>
                        </Col>
                        <Col style={{height: '25px', background: 'white'}}></Col> {/*여백2*/}
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>견적일자</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{estimateDate.estimateDate}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>유효기간</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{estimateDate.estimateExpireDt}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>결제조건</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{estimateDate.estimatePay}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>현장위치</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{estimateDate.estimatePlace}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={24} style={{height:'100%', background: 'white'}}></Col>{/*여백3*/}
                            </Row>
                        </Col>
                    </Col>
                    <Col span={2} style={{textAlign: 'center', background: 'white'}}>
                    </Col>
                    <Col span={11} style={{textAlign: 'center', background: 'brown'}}>
                        <Col className={'estimate-head'} style={{height: '25px'}}>공급자</Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>회사명</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{producer.companyNm}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>전화</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{producer.companyPhoneNumber}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>주소</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{producer.companyAddress}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>업태</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{producer.companyService}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>회사이메일</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{producer.companyEmail}</Col>
                            </Row>
                        </Col>
                        <Col style={{height: '25px', background: 'white'}}></Col>{/*여백4*/}
                        <Col className={'estimate-head'} style={{height: '25px'}}>견적 담당자</Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>담당자</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{estimator.member_nm}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>전화번호</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}>{estimator.phone}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '22px'}}>
                                <Col span={5} className={'estimate-head'} style={{height:'100%'}}>이메일</Col><Col span={19} className={'estimate-content'} style={{height:'100%'}}></Col>
                            </Row>
                        </Col>
                        <Col style={{height: '22px', background: 'white'}}></Col> {/*여백*/}
                        <Col style={{height: '22px', background: 'white'}}></Col> {/*여백*/}
                        <Col style={{height: '22px', background: 'white'}}></Col> {/*여백*/}
                        <Col style={{height: '25px', background: 'white'}}></Col> {/*여백*/}
                    </Col>
                </Row>

                <Table
                    {...tableProps}
                    columns={columns}
                    dataSource={dataSource}
                    summary={() => (
                        <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={5}>합 계 (VAT 별도)</Table.Summary.Cell>
                                <Table.Summary.Cell index={1} colSpan={3}>This is a summary content</Table.Summary.Cell>
                            </Table.Summary.Row>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={8} style={{textAlign: 'center'}}>[특이사항]</Table.Summary.Cell>
                            </Table.Summary.Row>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} colSpan={8}>- VAT 별도</Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )}
                />
            </Card>
        </>
    );
};
export default EstimateDtl;