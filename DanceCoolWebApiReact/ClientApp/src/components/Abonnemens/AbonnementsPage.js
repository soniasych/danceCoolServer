import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Container, Table, Button, InputGroup, FormControl } from 'react-bootstrap';

class AbonnementsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newAbonnementCreationEnabled: false,
            abonnements: [],
            newAbonnementName: null,
            newAbonnementPrice: null
        }
        this.onCreateAbonnement = this.onCreateAbonnement.bind(this);
        this.onNewAbonnementPriceInputChanged = this.onNewAbonnementPriceInputChanged.bind(this);
        this.onNewAbonnementNameInputChanged = this.onNewAbonnementNameInputChanged.bind(this);
        this.onAddNewAbonnement = this.onAddNewAbonnement.bind(this);
    }

    componentDidMount() {
        this.getAllAbonnements();
    }

    onCreateAbonnement(event) {
        if (this.state.newAbonnementCreationEnabled === false)
            this.setState({ newAbonnementCreationEnabled: true });
        else
            this.setState({ newAbonnementCreationEnabled: false });
    }

    onNewAbonnementPriceInputChanged(event) {
        this.setState({ newAbonnementPrice: event.target.value });
    }

    onNewAbonnementNameInputChanged(event) {
        this.setState({ newAbonnementName: event.target.value });
    }

    onAddNewAbonnement(){
        this.postNewAbonnement();
    }


    render() {
        let abonnements = this.state.abonnements;
        return (
            <Container>
                <h2>
                    Діючі абонементи
            </h2>
                <Button onClick={this.onCreateAbonnement}>
                    Створити новий
                   </Button>
                <br />
                <br />
                <InputGroup className="mb-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text >Найменування</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        disabled={!this.state.newAbonnementCreationEnabled}
                        onChange={this.onNewAbonnementNameInputChanged}
                         />
                    <InputGroup.Prepend>
                        <InputGroup.Text >Ціна</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        disabled={!this.state.newAbonnementCreationEnabled}
                        onChange={this.onNewAbonnementPriceInputChanged}
                    />
                    <InputGroup.Append>
                        <Button variant="success"
                            disabled={!this.state.newAbonnementCreationEnabled}
                            onClick={this.onAddNewAbonnement}>
                            Підтвердити
                            </Button>
                    </InputGroup.Append>
                </InputGroup>
                <Table>
                    <thead>
                        <tr>
                            <th>Найменування абонемента</th>
                            <th>Ціна</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abonnements.map(abonnement => (
                            <tr key={abonnement.id}>
                                <td>{abonnement.abonnementName}</td>
                                <td>{abonnement.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }

    postNewAbonnement(){
        const addNewAbonnementReqObject ={
            abonnementTypeName:this.state.newAbonnementName,
            abonnementTypePrice:this.state.newAbonnementPrice
        }
        console.log(addNewAbonnementReqObject);
        // Axios.post('api/abonnements/new-abonnement', addNewAbonnementReqObject, {
        //     headers: {
        //         Authorization: `Bearer ${this.props.access_token}`
        //     }})
        // .then(response => console.log(response))
        // .catch(error=>console.log(error));
    }

    getAllAbonnements() {
        Axios.get('api/abonnements', {
            headers: {
                Authorization: `Bearer ${this.props.access_token}`
            }})
            .then(response => {
                this.setState({ abonnements: response.data });
            })
            .catch();
    }

}


const mapStateToProps = state => {
    return {
        access_token: state.logInReducer.access_token,
        roleName: state.logInReducer.roleName
    };
};

export default connect(mapStateToProps)(AbonnementsPage);