import React, { Component } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';

export class AttendancePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            attendances: []
        };
    }

    getAttendancesByMonth = () => {
        Axios.get('https://my.api.mockaroo.com/attendances.json?key=63b23930')
        .then(response => 
            this.setState({attendances: response.data})
            );
    }
    
    componentDidMount() {
        this.getAttendancesByMonth();
      }

    render(){
        
        return(
        <div>Attendance Table
            <div>
                <div>
                    Select group
                </div>
                <div>
                    Add student to group
                </div>
            </div>
            <div>
                <div>
                    <Table>
                        <thead>
                        {this.state.attendances.map(lesson =>
                                <tr key={lesson.id}>
                                    <th>Students</th>
                                    <th>{lesson.data1}</th>
                                    {/* <th>{lesson.data2}</th>
                                    <th>{lesson.data3}</th>
                                    <th>{lesson.data4}</th>
                                    <th>{lesson.data5}</th>
                                    <th>{lesson.data6}</th>
                                    <th>{lesson.data7}</th>
                                    <th>{lesson.data8}</th> */}
                                </tr>
                                )}
                        </thead>
                        <tbody>
                        {this.state.attendances.map(lesson =>
                            <tr key={lesson.id}>
                                <td>{lesson.name}</td>
                                <td>{lesson.lesson1 ? <span> yes</span>:<span>no</span>}</td>
                                <td>{lesson.lesson2 ? <span> yes</span>:<span>no</span>}</td>
                                <td>{lesson.lesson3 ? <span> yes</span>:<span>no</span>}</td>
                                <td>{lesson.lesson4 ? <span> yes</span>:<span>no</span>}</td>
                                <td>{lesson.lesson5 ? <span> yes</span>:<span>no</span>}</td>
                                <td>{lesson.lesson6 ? <span> yes</span>:<span>no</span>}</td>
                                <td>{lesson.lesson7 ? <span> yes</span>:<span>no</span>}</td>
                                <td>{lesson.lesson8 ? <span> yes</span>:<span>no</span>}</td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <div>
                    Add new lesson date
                </div>
                
            </div>




        </div>
        );
    }
    
}