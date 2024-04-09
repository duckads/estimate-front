import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {setCookie} from "../utils/cookieUtil";
import {
    Button,
    Input,
    Form,
} from "antd";

const Login = () => {
    const history = useNavigate();
    const [setErrorMessage] = useState(null);

    const loginApi = async (url, requestData) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData), // JSON 데이터를 문자열로 변환하여 바디에 추가
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

    const onFinish = values => {
        loginApi('http://localhost:8080/auth/signin', values).then(data => {
            setCookie('token', data.token);
            history('/console/dashboard')
        }).catch(error => {
            // 로그인에 실패하거나 요청이 실패한 경우 실행되는 부분
            console.error('Login failed:', error);
            setErrorMessage('로그인에 실패하셨습니다.')
        });
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="container-login">
                <div className="container-loginform">
                    <div className="container-logo">
                    </div>
                    <div className="login-title">로그인</div>
                    <div className='login-subtitle'>
                        {/*아직 계정이 없으신가요? <Link to={UrlPath.getUrlPath('signup')}></Link>*/}
                    </div>
                    <div className='login-form'>
                        <Form layout='vertical'
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="아이디"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '아이디를 입력해주세요'
                                    }
                                ]}
                            >
                                <Input placeholder="아이디를 입력해주세요" />
                            </Form.Item>
                            <Form.Item
                                label="비밀번호"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '비밀번호를 입력해주세요'
                                    }
                                ]}
                            >
                                <Input.Password placeholder="비밀번호를 입력해주세요" />
                            </Form.Item>
                            <div style={{ marginBottom: '20px' }}>
                            </div>
                            <Form.Item style={{textAlign: 'left'}}>
                                <Button type="primary" htmlType="submit">로그인</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="container-carousel">
                </div>
            </div>
        </>
    );
};
export default Login;