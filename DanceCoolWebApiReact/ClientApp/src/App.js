import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import { GuestPage } from './components/GuestComponent/GuestPage';
import { GroupList } from './containers/GroupList';
import GroupPage from './containers/GroupPage'
import ManageUsersPage from './containers/ManageUsersPage';
import RegisteredUserPage from './components/RegisteredUserPage/RegisteredUserPage'
import { AttendancePage } from './components/AttendancePage/Attendances';
import Schedule from './components/GuestComponent/Schedule/Schedule';
import AboutUs from './components/GuestComponent/AboutUs/AboutUs';
import GroupsGuestPage from './components/GuestComponent/GroupsGuest/GroupsGuestPage';
import MentorsGuestPage from './components/GuestComponent/MentorsGuest/MentorsGuestPage';
import ContactsGuestPage from './components/GuestComponent/ContactsGuest/ContactsGuestPage';
import StudentProfile from './components/Profiles/StudentProfile/StudentProfile';

export class App extends Component {

  render() {
    return (
      <Layout>
        <Route exact path='/' component={GuestPage} />
        <Route exact path='/about-us' component={AboutUs} />
        <Route exact path='/guest-group' component={GroupsGuestPage} />
        <Route exact path='/schedule' component={Schedule} />
        <Route exact path='/guest-mentors' component={MentorsGuestPage} />
        <Route exact path='/guest-contacts' component={ContactsGuestPage} />
        <Route exact path='/god-mode-on' component={RegisteredUserPage} />
        <Route exact path='/groups' component={GroupList} />
        <Route exact path='/groups/:id' component={GroupPage} />
        <Route exact path='/students/' component={ManageUsersPage} />
        <Route exact path='/attendances' component={AttendancePage} />
        <Route exact path='/student-profile/1' component={StudentProfile} />
      </Layout>
    );
  }
}
