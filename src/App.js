import { Route, Routes, useLocation} from "react-router-dom";
import Login from "./views/Login";
import { getCookie } from "./utils/cookieUtil";

import Dashboard from "./views/Dashboard/Dashboard";
import Project from "./views/Business/Project";
import Estimate from "./views/Business/Estimate";
import EstimateDtl from "./views/Business/EstimateDtl";
import OrderForm from "./views/Business/OrderForm";

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
                <Routes>
                    <Route path="/console/login" element={<Login />} />
                    <Route path="/console/dashboard" element={<Dashboard />} />
                    <Route path="/console/project" element={<Project />} />
                    <Route path="/console/estimate" element={<Estimate />} />
                    <Route path={`/console/estimatedtl/:id`} element={<EstimateDtl />} />
                    <Route path="/console/orderform" element={<OrderForm />} />
                </Routes>
        );
    }
}

export default App;
