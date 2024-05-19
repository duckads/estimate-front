import { Route, Routes, useLocation} from "react-router-dom";
import Login from "./views/Login";
import { getCookie } from "./utils/cookieUtil";

import Dashboard from "./views/Dashboard/Dashboard";
import Project from "./views/Business/Project";
import Estimate from "./views/Business/Estimate";
import EstimateDtl from "./views/Business/EstimateDtl";
import OrderForm from "./views/Business/OrderForm";
import {Layout} from "antd";
import Left from "./layout/Left";
import Gnb from "./layout/Gnb";
import {Content} from "antd/es/layout/layout";

function App() {
    let token = getCookie('token');
    const location = useLocation();
    console.log(location);

    if (!token || location.pathname === "/console/login") {
        return (
            <div className="App">
                <Login/>
            </div>
        )
    } else {
        return (


            <div className="App">
                <Layout>
                    <Left/>
                    <Content
                        style={{
                            padding: 5,
                            margin: 0,
                            minHeight: 600,
                        }}
                    >
                        <Gnb/>
                        <div id="exportLayout" style={{padding: 20}}>
                            <Routes>
                                <Route path="/console/login" element={<Login/>}/>
                                <Route path="/console/dashboard" element={<Dashboard/>}/>
                                <Route path="/console/project" element={<Project/>}/>
                                <Route path="/console/estimate" element={<Estimate/>}/>
                                <Route path={`/console/estimatedtl/:id`} element={<EstimateDtl/>}/>
                                <Route path="/console/orderform" element={<OrderForm/>}/>
                            </Routes>
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default App;
