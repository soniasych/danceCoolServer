import React from 'react';

const UsersList = (props) => {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>Ім'я</th>
          <th>Прізвище</th>
          <th>Нормер телефону</th>
        </tr>
      </thead>
      <tbody>
        {props.students.map(student => (
          <tr key={student.id}>
            <td>{student.firstName} {student.lastName}</td>
            <td>{student.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>);
}

export default UsersList;