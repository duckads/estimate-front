import LoginForm from '@/components/form/LoginForm';
import { Card, Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

export default function LoginPage() {
  return (
    <Layout >
      <Content style={{ height: '100vh' }}>
        <Row
          justify="center"
          align="middle"
          style={{ height: '100%' }}
        >
          <Col xs={ 24 } md={ 16 } xl={ 12 }>
            <Row
              justify="center"
              align="middle"
            >
              <Card style={{ margin: '20px', minHeight: '400px', height: '100%', maxWidth: '700px', minWidth: '500px' }}>
                <Row
                  justify="center"
                  align="middle"
                  style={{ margin: '20px' }}
                >
                  <h1>LOGIN</h1>
                </Row>
                <LoginForm />
              </Card>
            </Row>
          </Col>
          <Col xs={ 24 } md={ 16 } xl={ 12 }>
            <Card style={{ margin: '20px', minHeight: '400px' }}>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
