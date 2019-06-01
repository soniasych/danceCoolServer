import React, { Component } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import './Attendances.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export class AttendancePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            attendances: [],
            students: []
        };
    }

    getAttendancesByMonth = () => {
        Axios.get('https://my.api.mockaroo.com/attendances.json?key=63b23930')
        .then(response => 
            this.setState({attendances: response.data})
            );
    }

    getStudents = () => {
        Axios.get('api/groups/2/users/')
        .then(response => 
            this.setState({students: response.data})
            );
    }
    
    componentDidMount() {
        this.getAttendancesByMonth();
        this.getStudents();
      }

    render(){
        
        return(
        <div>
            <div className="Attendances-options-toolbar">
                <div>
                    <Button variant="primary">
                        Додати студента до групи
                    </Button>
                </div>
                <div>
                <DropdownButton id="dropdown-basic-button" title="Оберіть групу">
                    <Dropdown.Item href="#/action-1">Salsa LA</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Salsa Casino</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Бачата</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Salsa Lady Solo</Dropdown.Item>
                </DropdownButton>
                </div>
                <div>
                    <Button variant="primary">
                        Додати нове заняття
                    </Button>
                </div>
            </div>
            <br/>
            <div>
                <div>
                    <Table bordered>
                        <thead>
                                <tr>
                                    <th>Students</th>
                                    <th>12.05</th>
                                    <th>12.05</th>
                                    <th>12.05</th>
                                    <th>12.05</th>
                                    <th>12.05</th>
                                    <th>12.05</th>
                                    <th>12.05</th>
                                    <th>12.05</th>
                                </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.attendances.map(lesson =>
                                <tr key={lesson.id}>
                                    <td>{lesson.name} {lesson.surname}</td>
                                    <td>{lesson.lesson1 ? <span> +</span>:null}</td>
                                    <td>{lesson.lesson2 ? <span> +</span>:null}</td>
                                    <td>{lesson.lesson3 ? <span> +</span>:null}</td>
                                    <td>{lesson.lesson4 ? <span> +</span>:null}</td>
                                    <td>{lesson.lesson5 ? <span> +</span>:null}</td>
                                    <td>{lesson.lesson6 ? <span> +</span>:null}</td>
                                    <td>{lesson.lesson7 ? <span> +</span>:null}</td>
                                    <td>{lesson.lesson8 ? <span> +</span>:null}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        );
    }
    
}