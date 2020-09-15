import React, {Component} from 'react';
import {
  Button, Card, CardBody, CardGroup, Col, Container,
  Form,
  Row
} from 'reactstrap';
import {CALLBACK_URL} from '../../../constants/ActionTypes';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    window.location = CALLBACK_URL;
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login your account</h1>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleSubmit}
                          >Login</Button>
                        </Col>
                      </Row>
                      <br/>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
