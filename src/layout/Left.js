import logoCollapsed from '../assets/img/shield_logo.png';
import React, { useState, } from 'react';
import {useNavigate} from 'react-router-dom';
import { Layout, Menu } from 'antd';
const {  Sider } = Layout;

const Left = () => {
    const history = useNavigate();

    const [logoHeight, setLogoHeight] = useState(null);

    const handleLogoLoad = (event) => {
        // 이미지 로딩 후, 크기를 가져와 state에 설정
        setLogoHeight(event.target.height + 20);
    };

    return (
        <Sider style={{minHeight:1024}} mode="inline" >
            <div className="logo" style={{ height: logoHeight}}>
                <img src={logoCollapsed} alt="실드 로고" onLoad={handleLogoLoad}/>
            </div>
            <Menu
                mode="inline"
                onClick={(e)=>{
                    console.log(e.key);
                    history('/console/'+e.key);
                }}
                items={[
                    {
                        key: `dashboard`,
                        label: `대시보드`
                    },
                    {
                        key: `basicInfo`,
                        label: `기초정보`,
                        children: [
                            { key : "customer" , label : "고객처" },
                            { key : "vendor" , label : "매입처" },
                            { key : "sitemanager" , label : "협력소장" }
                        ]

                    },
                    {
                        key: `business`,
                        label: `영업 관리`,
                        children: [
                            { key : "project" , label : "프로젝트" },
                            { key : "estimate" , label : "견적서" },                    
                            { key : "orderform" , label : "발주서" }
                        ]

                    },
                    {
                        key: `managemennt`,
                        label: `조직관리`,
                        children: [
                            { key : "membermanage" , label : "직원관리" }                    
                        ]

                    }
                ]}
            />
        </Sider>
    );
};
export default Left;
