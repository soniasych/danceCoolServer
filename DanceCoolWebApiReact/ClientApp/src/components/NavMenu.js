import React, { Component } from 'react';
import {
  Collapse, Container, Button,
  Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
  Popover, PopoverHeader, PopoverBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import AuthenticationModal from './Authentication/AuthenticationModal';
import Logo from '../assets/lasalsa-logo.png';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/index';

class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.state = {
      authenticationModalVisible: false,
      defaultModalTab: 'SignInTab',
      collapsed: true,
      popoverOpen: false
    };
    this.AuthenticationMModalVisibilityHandler = this.AuthenticationModalVisibilityHandler.bind(AuthenticationModal);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.onLogOutClick = this.onLogOutClick.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  AuthenticationModalVisibilityHandler = event => {
    if (this.state.authenticationModalVisible === false) {
      this.setState({ authenticationModalVisible: true });
      console.log(this.props.authEmail);
    }
    else {
      this.setState({ authenticationModalVisible: false });
    }
  }

  togglePopover() {
    if (this.state.popoverOpen === false) {
      this.setState({ popoverOpen: true });
    }
    else {
      this.setState({ popoverOpen: false });
    }
  }

  onLogOutClick() {
    this.props.onLogOut();
    this.setState({ popoverOpen: false });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-black border-bottom box-shadow" dark>
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img src={Logo} alt="LaSalsaLogo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Головна</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/about-us">Про нас</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/guest-group">Групи</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/schedule">Розклад</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/guest-mentors">Наставники</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/guest-contacts">Контакти</NavLink>
                </NavItem>
                <NavItem>
                  {this.props.isLogedIn ?
                    < div >
                      <Button id="Popover1" type="button" onClick={this.togglePopover}>
                        Вітаємо, {this.props.firstName} {this.props.lastName}
                      </Button>
                      <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1">
                        <PopoverHeader>La la Land</PopoverHeader>
                        <PopoverBody>
                          <Button className="btn btn-light"
                            onClick={this.onLogOutClick}>
                            Вийти
                          </Button>
                        </PopoverBody>
                      </Popover>
                    </div> :
                    <Button className="btn btn-light"
                      onClick={this.AuthenticationModalVisibilityHandler}>Увійти</Button>
                  }
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
        <AuthenticationModal
          visible={this.state.authenticationModalVisible}
          close={this.AuthenticationModalVisibilityHandler}
          tabSwitching={this.onAuthenticationSelectTab}
          authenticationButtonText={this.state.AuthenticationButtonText}
          isPopoverOpen={this.state.popoverOpen} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogedIn: state.logInReducer.access_token != null,
    email: state.logInReducer.email,
    firstName: state.logInReducer.firstName,
    lastName: state.logInReducer.lastName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actionTypes.LogOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);