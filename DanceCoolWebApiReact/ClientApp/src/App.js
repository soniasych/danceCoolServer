import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { GuestPage } from './components/GuestComponent/GuestPage';
import { GroupList } from './components/GroupPage/GroupList';
import { GroupPage } from './components/GroupPage/GroupPage'
import { ManagingUsersPage } from './components/UserPage/ManagingUsersPage';
import { AdminPage } from './components/AdminPage';
import { AttendancePage } from './components/AttendancePage/Attendances';
import Schedule from './components/GuestComponent/Schedule/Schedule';
import AboutUs from './components/GuestComponent/AboutUs/AboutUs';
import GroupsGuestPage from './components/GuestComponent/GroupsGuest/GroupsGuestPage';
import MentorsGuestPage from './components/GuestComponent/MentorsGuest/MentorsGuestPage';
import ContactsGuestPage from './components/GuestComponent/ContactsGuest/ContactsGuestPage';
import StudentProfile from './components/Profiles/StudentProfile/StudentProfile';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoLogin();
  }

  render() {
    return (
      <Layout>
        <Route exact path='/' component={GuestPage} />
        <Route exact path='/about-us' component={AboutUs} />
        <Route exact path='/guest-group' component={GroupsGuestPage} />
        <Route exact path='/schedule' component={Schedule} />
        <Route exact path='/guest-mentors' component={MentorsGuestPage} />
        <Route exact path='/guest-contacts' component={ContactsGuestPage} />
        <Route exact path='/god-mode-on' component={AdminPage} />
        <Route exact path='/groups' component={GroupList} />
        <Route exact path='/groups/:id' component={GroupPage} />
        <Route exact path='/students/' component={ManagingUsersPage} />
        <Route exact path='/students/:id' component={ManagingUsersPage} />
        <Route exact path='/attendances' component={AttendancePage} />
        <Route exact path='/student-profile/1' component={StudentProfile} />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin:()=>dispatch(actions.CheckLogInState())
  };
};

export default connect(null, mapDispatchToProps)(App);
