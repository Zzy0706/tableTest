import React, { Component } from 'react';
import EditableTable from './components/EditableTable';

export default class TablePage3 extends Component {
  static displayName = 'TablePage3';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table-page3-page">
        <EditableTable />
      </div>
    );
  }
}
