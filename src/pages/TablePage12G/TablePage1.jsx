import React, { Component } from 'react';
import EditableTable from './components/EditableTable';
import UserSearch from './UserSearch';

export default class TablePage1 extends Component {
  static displayName = 'TablePage1';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table-page1-page">
        <EditableTable />
      </div>
    );
  }
}
