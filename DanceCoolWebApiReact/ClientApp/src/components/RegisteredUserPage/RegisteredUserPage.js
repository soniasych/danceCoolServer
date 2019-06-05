import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Nav, Row, Col, Container } from 'react-bootstrap';
import { ManageUsersPage } from '../ManageUsersPage/ManageUsersPage'


class RegisteredUserPage extends Component {
    render() {
        return (
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="attendances">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="Attendances">Групи та відвідуваність</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Payments">Платежі</Nav.Link>
                                </Nav.Item>
                                {this.props.roleName === 'Mentor' || this.props.roleName === 'Admin' ?
                                    <Nav.Item>
                                        <Nav.Link eventKey="Groups">Групи</Nav.Link>
                                    </Nav.Item> : null
                                }
                                {this.props.roleName === 'Mentor' || this.props.roleName === 'Admin' ?
                                    <Nav.Item>
                                        <Nav.Link eventKey="Students">Групи</Nav.Link>
                                    </Nav.Item> : null
                                }
                                {this.props.roleName === 'Admin' ?
                                    <Nav.Item>
                                        <Nav.Link eventKey="ManageUsers">Керування користувачами</Nav.Link>
                                    </Nav.Item> : null
                                }
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="Attendances">
                                    <div>Attendances</div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Payments">
                                    <div>Payments</div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Groups">
                                    <div>Groups</div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Students">
                                    <div>Groups</div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="ManageUsers">
                                    <ManageUsersPage/>
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
        access_token: state.logInReducer.access_token,
        roleName: state.logInReducer.roleName
    };
};

export default connect(mapStateToProps)(RegisteredUserPage);