import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AttendancePage } from '../AttendancePage/Attendances';
import { Tab, Nav, Row, Col, Container } from 'react-bootstrap';

class RegisteredUserPage extends Component {
    render() {
        return (
            <Container>

                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Групи та відвідуваність</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Платежі</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="StudentProfile-main-context">
                                        <br />
                                        <div className="StudentProfile-attendances">
                                            <div>
                                                <h2>
                                                    Журнал відвідувань
                                            </h2>
                                                <br />
                                            </div>
                                            <div>
                                                <AttendancePage />
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    Tab 2 context
                            </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        access_token: state.logInReducer.access_token
    };
};


export default connect(mapStateToProps)(RegisteredUserPage);