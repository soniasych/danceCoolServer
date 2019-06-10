import React from 'react';
import './GuestPage.css';
import Background from '../../assets/guestPageBackGround1.jpg'

export const GuestPage = (props) => {
  console.log(props);
  return (<div className="container1">
    <div className="content">
      <h1>La Salsa Lviv</h1>
      <p>Додай в своє життя перчинку!</p>
    </div>
    <img src={Background} alt="PaholkivIsTHeBest" className="backGround" />
  </div>);
}
