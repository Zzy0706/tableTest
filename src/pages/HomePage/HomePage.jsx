import React, { Component } from 'react';
import UserTable from './components/UserTable';

export default class HomePage extends Component {
  static displayName = 'HomePage';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page-page">
        <UserTable />
      </div>
    );
  }
}
