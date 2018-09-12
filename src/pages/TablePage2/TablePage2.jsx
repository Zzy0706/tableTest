import React, { Component } from 'react';
import EditableTable from './components/EditableTable';

export default class TablePage2 extends Component {
  static displayName = 'TablePage2';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table-page2-page">
        <EditableTable />
      </div>
    );
  }
}
