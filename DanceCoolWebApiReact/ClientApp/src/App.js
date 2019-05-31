import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { GuestPage } from './components/Guest-Page/GuestPage';
import { GroupList } from './components/GroupPage/GroupList';
import { GroupPage } from './components/GroupPage/GroupPage'
import { ManagingUsersPage } from './components/UserPage/ManagingUsersPage';
import { AdminPage } from './components/AdminPage';
import { AttendancePage } from './components/AttendancePage/Attendances';
import {Schedule} from './components/Guest-Page/Schedule';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={GuestPage} />
        <Route exact path='/god-mode-on' component={AdminPage} />
        <Route exact path='/groups' component={GroupList} />
        <Route exact path='/groups/:id' component={GroupPage} />
        <Route exact path='/students/' component={ManagingUsersPage} />
        <Route exact path='/students/:id' component={ManagingUsersPage} />
        <Route exact path='/attendances' component={AttendancePage} />
        <Route exact path='/schedule' component={Schedule}/>
      </Layout>
    );
  }
}
