import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Tab, Nav, Row, Col, Container } from 'react-bootstrap';
import { GroupList } from '../GroupPage/GroupList';
import { ManageUsersPage } from '../ManageUsersPage/ManageUsersPage';
import GroupPage from '../GroupPage/GroupPage';
import { AttendancePage } from '../AttendancePage/Attendances';

class RegisteredUserPage extends Component {
    render() {
        return (
            <Container style={{marginTop: 30}}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="Attendances">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="Attendances">Відвідуваність</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Payments">Платежі</Nav.Link>
                                </Nav.Item>
                                {this.props.roleName === 'Mentor' || this.props.roleName === 'Admin' ?
                                    <Nav.Item>
                                        <Nav.Link eventKey="Groups">Групи</Nav.Link>
                                    </Nav.Item> : null
                                }
                                {this.props.roleName === 'Admin' ?
                                    <Nav.Item>
                                        <Nav.Link eventKey="ManageUsers">Менеджмент користувачів</Nav.Link>
                                    </Nav.Item> : null
                                }
                                {this.props.roleName === 'Admin' ?
                                    <Nav.Item>
                                        <Nav.Link eventKey="Abonnements">Абонементи</Nav.Link>
                                    </Nav.Item> : null
                                }
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="Attendances">
                                    <AttendancePage />
                                </Tab.Pane>
                                <Tab.Pane eventKey="Payments">
                                    <div>Payments</div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Groups">
                                    <Route path='/groups' component={GroupList} />
                                    <Route path='/groups/:id' component={GroupPage} />
                                    <GroupList />
                                </Tab.Pane>
                                <Tab.Pane eventKey="ManageUsers">
                                    <ManageUsersPage />
                                </Tab.Pane>
                                <Tab.Pane eventKey="Abonnements">
                                    <div>Абонементи</div>
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