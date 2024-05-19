import React from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row, Breadcrumb } from 'antd';
import { CaretDownFilled, MehTwoTone } from '@ant-design/icons';

const Gnb = () => {

    const location = useLocation();
    let pageNm;
    let menuNm = [];
    switch (location.pathname) {
        case '/console/dashboard':
            pageNm = '대시보드';
            menuNm = [{title: '대시보드'}]
            break;
        case '/console/customer':
            pageNm = '고객처';
            menuNm = [{title: '기초정보'},{title: '고객처'}]
            break;
        case '/console/vendor':
            pageNm = '매입처';
            menuNm = [{title: '기초정보'},{title: '매입처'}]
            break;
        case '/console/sitemanager':
            pageNm = '협력소장';
            menuNm = [{title: '기초정보'},{title: '협력소장'}]
            break;
        case '/console/project':
            pageNm = '프로젝트';
            menuNm = [{title: '영업관리'},{title: '프로젝트'}]
            break;
        case '/console/estimate':
            pageNm = '견적서';
            menuNm = [{title: '영업관리'},{title: '견적서'}]
            break;
        case '/console/orderform':
            pageNm = '발주서';
            menuNm = [{title: '영업관리'},{title: '발주서'}]
            break;
    }

    return (
        <div style={{
            width:"100%",
            textAlign :"right",
            paddingTop: 20,
            paddingRight: 20,
            paddingBottom: 20,
            paddingLeft: 20
        }}>

        <Row justify="center" align="middle" >
            <Col span={12} style={{textAlign: 'left'}}>
                <h2 style={{ textAlign: '0', display: 'inline-block', marginRight: '10px'}}>{pageNm}</h2>
                <Breadcrumb
                    style={{display: 'inline-block'}}
                    separator=">"
                    items={menuNm}
                />
            </Col>
            <Col span={12}>
                <MehTwoTone />
                <span style={{ display: 'inline-block', marginLeft: '8px'}}>안성재</span>
                <CaretDownFilled />
            </Col>
        </Row>
        </div>
    );
};
export default Gnb;
