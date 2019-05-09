import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Main-Page/Home';
import { Groups } from './components/Main-Page/Group/Groups';
import { GroupTittle } from './components/GroupPage/GroupTittle'
import { ManagingUsersPage } from './components/UserPage/ManagingUsersPage';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/groups' component={Groups} />
        <Route exact path='/groups/:id' component={GroupTittle} />
        <Route exact path='/students/' component={ManagingUsersPage} />
        <Route exact path='/students/:id' component={ManagingUsersPage} />
      </Layout>
    );
  }
}
