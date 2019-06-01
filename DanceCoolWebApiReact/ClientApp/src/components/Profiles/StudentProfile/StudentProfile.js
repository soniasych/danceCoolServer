import React from 'react';
import { AttendancePage } from '../../AttendancePage/Attendances';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const StudentProfile = ()=> {
    return(
    <div>
        <div>
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
                                    <div>
                                        <label>
                                            Групи, у яких ви навчаєтесь на даний момент: Salsa LA, Latina Lady Solo.
                                        </label>
                                    </div>
                                    <br/>
                                    <div className="StudentProfile-attendances">
                                        <div>
                                            <h2>
                                                Журнал відвідувань
                                            </h2>
                                            <br/>
                                        </div>
                                        <div>
                                            <AttendancePage/>
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
        </div>
        
    </div>);
}

export default StudentProfile;