import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import AddPaymentModal from "./AddPaymentModal";

class AddNewPaymentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentId: null,
      currentAbonnementId: null,
      currentDate: null,
      userSenderId: null,
      userReceiverId: 1,
      abonnementPrice: null,
      quantity: [1, 2, 3, 4],
      currentQuantity: null,
      totalSum: 0,
      paymentsByUserSender: [],
      abonnements: [],
      isAddingActive: false
    };

    this.onSelectedAbonement = this.onSelectedAbonement.bind(this);
    this.onQuantitySelectChanged = this.onQuantitySelectChanged.bind(this);
    this.onTotalSumCount = this.onTotalSumCount.bind(this);
    this.onAddPaymentButtonClickHandler = this.onAddPaymentButtonClickHandler.bind(
        this
    );
  }

  componentDidMount() {
    this.getAbonnements();
    console.log(this.state.abonnements);
  }
  onSelectedAbonement = event => {
    let selectedIndex = event.target.options.selectedIndex;
    let newAbonnementId = parseInt(
      event.target.options[selectedIndex].getAttribute("abonnementid")
    );

    let currentPrice = this.state.abonnements.find(
      abonnement => abonnement.id === newAbonnementId
    ).price;

    this.setState({
      currentAbonnementId: newAbonnementId,
      abonnementPrice: currentPrice
    });
    this.onTotalSumCount(currentPrice, this.state.currentQuantity);
    //this.getPaymentsByGroupId(newAbonnementId);
  };

  onQuantitySelectChanged = event => {
    let newQuantity = parseInt(event.target.value);
    this.setState({ currentQuantity: newQuantity });
    console.log(this.state.currentQuantity);
    this.onTotalSumCount(this.state.abonnementPrice, newQuantity);
  };

  onTotalSumCount = (abonnementPrice, quantity) => {
    let totalSum = abonnementPrice * quantity;
    this.setState({ totalSum: totalSum });
    console.log(this.state.totalSum);
  };

  onAddPaymentButtonClickHandler = event => {
    const headers = { Authorization: `Bearer ${this.props.access_token}` };
    const today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    let time = `${today.getHours()}:${today.getMinutes()}`

    const newPaymentData = {
      date: `${date} `,
      time: `${time}`,
      userSender: this.props.authUserId,
      userReceiver: this.state.userReceiverId,
      abonnement: this.state.currentAbonnementId,
      totalSum: this.state.totalSum
    };
    
        Axios.post('api/payments/', newPaymentData, {headers: headers})
                    .then(response => {
                        console.log(newPaymentData);
                        this.setState({ paymentId: response.data.id });
                    })
                    .catch(error => console.log(error));
            
  };

  render() {
    return (
      <form className="needs-validation" noValidate>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label>Тип абонементу</label>
            <div>
              <Form.Control
                as="select"
                className="select"
                onChange={this.onSelectedAbonement}
              >
                <option selected>Оберіть тип абонементу</option>
                {this.state.abonnements.map(abonnement => (
                  <option key={abonnement.id} abonnementid={abonnement.id}>
                    {abonnement.abonnementName}
                  </option>
                ))}
              </Form.Control>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label>Кількість</label>
            <div>
              <Form.Control
                as="select"
                className="select"
                onChange={this.onQuantitySelectChanged}
              >
                <option selected>Оберіть кількість</option>
                {this.state.quantity.map(quantity => (
                  <option abonnementid={quantity}>{`${quantity}`}</option>
                ))}
              </Form.Control>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label>Сума до оплати</label>
            <Form.Control
              type="text"
              disabled={true}
              value={this.state.totalSum}
            />
          </div>
        </div>
        {/* <AddPaymentModal addNewPayment={this.onAddPaymentButtonClickHandler}/> */}
        <button className="btn btn-primary" type="button" onClick={this.onAddPaymentButtonClickHandler}>
          Оплатити
        </button>
      </form>
    );
  }

  getAbonnements() {
    Axios.get("api/abonnements/", {
      headers: {
        Authorization: `Bearer ${this.props.access_token}`
      }
    }).then(response => {
      console.log(response.data);
      this.setState({ abonnements: response.data });
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

export default connect(mapStateToProps)(AddNewPaymentForm);
