import React, { Component } from 'react';
import { Jumbotron, Button, Container } from 'react-bootstrap';
import './GuestPage.css';
import Background from '../../assets/guestPageBackGround.jpg'

export class GuestPage extends Component {
  render() {
    return (
   
      <img src={Background} alt="Notebook" className="backGround"/>
      
    );
  }
}
