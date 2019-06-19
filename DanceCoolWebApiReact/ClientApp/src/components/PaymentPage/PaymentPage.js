import React, { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import "./PaymentPage.css";
import AddPaymentModal from '../PaymentPage/AddPaymentModal';
import { connect } from "react-redux";
import {
  Button,
  Form
} from "react-bootstrap";

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddPaymentModalOpen: false,
      addPaymentModalVisable: false,
      currentGroupId: 0,
      userSenderId: 0,
      groups: [],
      paymentsByGroup: [],
      paymentsByUserSender: [],
      newPayment: []
    };
    this.onSelectedGroup = this.onSelectedGroup.bind(this);
    this.addingNewPaymentModalHandler = this.addingNewPaymentModalHandler.bind(AddPaymentModal);
  }  

  componentDidMount() {
    this.props.roleName === "Student"
      ? this.getPaymentsByUserSenderId(this.props.authUserId)
      : console.log("la la land");
    //this.getPaymentsByGroupId();
    this.getGroups();
  }

  onSelectedGroup(event) {
    let selectedIndex = event.target.options.selectedIndex;
    let newGroupId = event.target.options[selectedIndex].getAttribute(
      "groupid"
    );
    console.log(newGroupId, event.target.value);
    this.setState({
      currentGroupId: newGroupId
    });
    this.getPaymentsByGroupId(newGroupId);
  }

  addingNewPaymentModalHandler = event => {
    if (this.state.addPaymentModalVisable === false) {
        this.setState({ addPaymentModalVisable: true });
    }
    else {
        this.setState({ addPaymentModalVisable: false });
    }
}

  render() {
    return (
      <div>
        <div className="payments-options-toolbar">
          <div>
            <Button variant="primary" onClick={this.addingNewPaymentModalHandler}>Створити платіж</Button>
            <AddPaymentModal visible={this.state.addPaymentModalVisable}
                    close={this.addingNewPaymentModalHandler}
                />
          </div>
          <br />
          {this.props.roleName === "Admin" ||
          this.props.roleName === "Mentor" ? (
            <div>
              <Form.Control
                as="select"
                className="custom-select"
                onChange={this.onSelectedGroup}
              >
                <option selected>Виберіть групу</option>
                {this.state.groups.map(group => (
                  <option key={group.groupId} groupid={group.groupId}>
                    {group.groupDirection} {group.groupLevel}
                  </option>
                ))}
              </Form.Control>
            </div>
          ) : null}
        </div>
        <br />
        <div>
          <Table bordered>
            <thead>
              <tr>
                <th>Студент</th>
                <th>Дата створення</th>
                <th>Тип абонементу</th>
                <th>Сума</th>
              </tr>
            </thead>
            {this.props.roleName === "Admin" ||
            this.props.roleName === "Mentor" ? (
              <tbody>
                {this.state.paymentsByGroup.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.userSender}</td>
                    <td>{payment.date}</td>
                    <td>{payment.abonnement}</td>
                    <td>{payment.totalSum}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {this.state.paymentsByUserSender.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.userSender}</td>
                    <td>{payment.date}</td>
                    <td>{payment.abonnement}</td>
                    <td>{payment.totalSum}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </div>
      </div>
    );
  }

  getPaymentsByGroupId(groupId) {
    Axios.get(`api/payments/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${this.props.access_token}`
      }
    })
      .then(response => {
        this.setState({ paymentsByGroup: response.data });
        console.log(this.state.paymentsByGroup);
      })
      .catch(error => console.log(error));
  }

  getPaymentsByUserSenderId(userSenderId) {
    Axios.get(`api/payments/${userSenderId}`, {
      headers: {
        Authorization: `Bearer ${this.props.access_token}`
      }
    })
      .then(response => {
        this.setState({ paymentsByUserSender: response.data });
        console.log(this.state.paymentsByUserSender);
      })
      .catch(error => console.log(error));
  }

  getGroups() {
    Axios.get("api/groups/", {
      headers: {
        Authorization: `Bearer ${this.props.access_token}`
      }
    }).then(response => {
      console.log(response.data);
      this.setState({ groups: response.data });
    });
  }
}

const mapStateToProps = state => {
  return {
    access_token: state.logInReducer.access_token,
    roleName: state.logInReducer.roleName,
    authUserId: state.logInReducer.userId
  };
};

export default connect(mapStateToProps)(PaymentPage);
