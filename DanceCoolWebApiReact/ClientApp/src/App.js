import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Main-Page/Home';
import { Groups } from './components/Main-Page/Group/Groups';
//import { GroupPageRoot } from './components/GroupPage/GroupPageRoot'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/groups' component={Groups} />
      </Layout>
    );
  }
}
