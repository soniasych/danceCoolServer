import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Main-Page/Home';
import { Groups } from './components/Main-Page/Group/Groups';
import { GroupPage } from './components/GroupPage/GroupPage'
import { ManagingUsersPage } from './components/UserPage/ManagingUsersPage';
import { AdminPage } from './components/AdminPage';
import { AttendancePage } from './components/AttendancePage/Attendances';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/god-mode-on' component={AdminPage} />
        <Route exact path='/groups' component={Groups} />
        <Route exact path='/groups/:id' component={GroupPage} />
        <Route exact path='/students/' component={ManagingUsersPage} />
        <Route exact path='/students/:id' component={ManagingUsersPage} />
        <Route exact path='/attendances' component={AttendancePage} />
      </Layout>
    );
  }
}
