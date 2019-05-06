import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Main-Page/Home';
import { Groups } from './components/Main-Page/Group/Groups';
import { GroupTittle } from './components/GroupPage/GroupTittle'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/groups' component={Groups} />
        <Route exact path='/groups/:id' component={GroupTittle} />
      </Layout>
    );
  }
}
