import React from 'react';

const UsersList = (props) => {
  this.TranslateRoleName = (engRoleName) => {
    switch (engRoleName) {
      case "Admin":
        return "Адміністратор";
      case "Mentor":
        return "Інструктор";
      default:
        return "Студент";
    }
  }

  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>Ім'я</th>
          <th>Нормер телефону</th>
          <th>Роль</th>
        </tr>
      </thead>
      <tbody>
        {props.students.map(student => (
          <tr key={student.id}>
            <td>{student.firstName} {student.lastName}</td>
            <td>{student.phoneNumber}</td>
            <td>{this.TranslateRoleName(student.roleName)}</td>
          </tr>
        ))}
      </tbody>
    </table>);
}

export default UsersList;