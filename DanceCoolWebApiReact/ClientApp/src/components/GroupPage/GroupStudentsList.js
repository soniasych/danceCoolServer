import React from 'react';

const GroupStudentsList = (props) => {
    return (
        <table className='table table-sm'>
            <thead>
                <tr>
                    <th>Прізвище</th>
                    <th>Ім'я</th>
                    <th>Номер телефону</th>
                </tr>
            </thead>
            <tbody>
                {props.groupStudents.map(student =>
                    <tr key={student.id}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.phoneNumber}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default GroupStudentsList;
