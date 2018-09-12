/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from 'react';
import { Table, Icon, Button, Grid, Pagination } from '@icedesign/base';
import axios from 'axios';
import { createHashHistory } from 'history';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      dataArray: [],
      current: 1,
    };
  }

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };
  componentWillMount() {
    axios.get('http://api.ers.wkclz.com/cms/tabletest/list').then((response) => {
      this.setState({
        dataArray: response.data.data.data,
      });
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  onChange = (...args) => {
    console.log(...args);
  };

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };
  lookData = (index) => {
    const { dataArray } = this.state;
    localStorage.setItem('tableData', JSON.stringify(dataArray[index]));
    const pageNum = dataArray[index].tableFlag;
    switch (pageNum) {
      case 1:
        createHashHistory().push('/TablePage12');
        break;
      case 2:
        createHashHistory().push('/TablePage22');
        break;
      case 3:
        createHashHistory().push('/TablePage32');
        break;
      default:
        break;
    }
    console.log(dataArray[index]);
  }
  renderOper = (valueKey, value, index, record) => {
    return (
      <div style={styles.oper}>
        <Button type="normal" onClick={this.lookData.bind(this, index)}> 查看</Button>
        {/* <Icon
          type="edit"
          size="small"
          style={{ ...styles.icon }}
        />
         <Icon
          type="ashbin"
          size="small"
          style={{ ...styles.icon, ...styles.deleteIcon }}
        /> */}
      </div>
    );
  };
  render() {
    return (
      <IceContainer title="用户列表">
        <Table
          dataSource={this.state.dataArray}
          rowSelection={{ onChange: this.onChange }}
        >
          <Table.Column title="序号" dataIndex="id" width={100} />
          <Table.Column title="姓名" dataIndex="tableName" width={100} />
          <Table.Column title="套餐类型" dataIndex="tableFlag" width={200} />
          <Table.Column title="套餐价格" dataIndex="tablePackagePrice" width={200} />
          <Table.Column title="实际价格" dataIndex="tableActualPrice" width={100} />
          <Table.Column title="营养师" dataIndex="tableDietitian" width={200} />
          <Table.Column title="医院" dataIndex="tableHospital" width={200} />
          <Table.Column title="创建时间" dataIndex="createTime" width={200} />
          <Table.Column title="操作" width={100} cell={this.renderOper.bind(this, 'quantity')} />
        </Table>
      </IceContainer>
    );
  }
}

const styles = {
  headRow: {
    marginBottom: '10px',
  },
  icon: {
    color: '#2c72ee',
    cursor: 'pointer',
  },
  deleteIcon: {
    marginLeft: '20px',
  },
  center: {
    textAlign: 'right',
  },
  button: {
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
