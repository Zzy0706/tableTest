import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Feedback, Table, Affix, Grid, Button, moment } from '@icedesign/base';
import axios from 'axios';
import IceLabel from '@icedesign/label';
import CellEditor from './CellEditor';
import './EditableTable.scss';

const { Row, Col } = Grid;
let defaultTotalPrice = 0;
let defaultIndex = 0;
let defaultTotalIndex = 0;
export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
      ],
      formValue: {},
      totalPrice: '',
      top: 50,
      top2: 25,
    };
  }

  renderOrder = (value, index) => {
    return <span>{index + 1}</span>;
  };

  changeDataSource = (index, valueKey, value) => {
    defaultTotalIndex = 0;
    this.state.dataSource[index][valueKey] = value;
    this.state.dataSource[index].amount = value * this.state.dataSource[index].univalent;
    this.setState({
      dataSource: this.state.dataSource,
    });
    this.getTotalPrice();
  };

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };
  showAlert = () => {
    const data = this.state.totalPrice;
    if (defaultTotalIndex === 0) {
      console.log(`目前金额${data}小于初始金额${defaultTotalPrice}`);
      Feedback.toast.prompt(`目前金额${data}小于初始金额${this.state.dataSource[14].amount}`);
    }
    defaultTotalIndex += 1;
  }
  getTotalPrice = () => {
    const data = Object.assign([], this.state.dataSource);
    let totalPrice = 0;
    delete data[14];
    data.map((item) => {
      totalPrice += item.amount;
      return null;
    });
    if (defaultIndex === 0) {
      defaultTotalPrice = totalPrice;
    }
    this.state.totalPrice = totalPrice;
    defaultIndex += 1;
    if (totalPrice < this.state.dataSource[14].amount) {
      this.showAlert();
    }
    this.setState({
      totalPrice,
    });
    return <span>{`￥${totalPrice}`} </span>;
  }
  getAmount =(value, index) => {
    if (index === 14) {
      return <span>{this.state.dataSource[index].amount}</span>;
    }
    const amount = this.state.dataSource[index].univalent * this.state.dataSource[index].quantity;
    return <span>{amount}</span>;
  }
  getCellProps = (rowIndex, colIndex) => {
    if (rowIndex === 0 && colIndex === 6) {
      return {
        colSpan: 1,
        rowSpan: 14,
      };
    }
  };
  _containerRefHandler(ref) {
    console.log(ref);
    this.container = ref;
  }
  componentWillMount() {
    const data = JSON.parse(localStorage.getItem('tableData'));

    console.log(data);
    this.setState({
      tableName: data.tableName,
      tableMobile: data.tableMobile,
      tableFlag: data.tableFlag,
      id: data.id,
      dataSource: JSON.parse(data.tableData),
    });
  }
  componentWillUnmount() {
    /* const data = JSON.parse(localStorage.getItem('tableData'));

    console.log(data); */
  }
  componentDidMount() {
    this.getTotalPrice();
  }
  saveData = () => {
    const { formValue } = this.state;
    formValue.tableName = this.state.tableName;
    formValue.tableMobile = this.state.tableMobile;
    formValue.tableFlag = this.state.tableFlag;
    formValue.tablePackagePrice = 22070;
    if (this.state.totalPrice) {
      formValue.tableActualPrice = this.state.totalPrice;
    } else {
      formValue.tableActualPrice = 22070;
    }
    formValue.tableActualPrice = this.state.totalPrice;
    formValue.tableData = JSON.stringify(this.state.dataSource);
    formValue.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
    formValue.id = this.state.id;

    console.log(formValue);
    axios.post('http://api.ers.wkclz.com/cms/tabletest/update',
      formValue,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
      localStorage.setItem('tableData', JSON.stringify(formValue));
      Feedback.toast.success(response.data.data);
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="editable-table">
        <IceContainer>
          <Row wrap>
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>姓名:</span>
              <span>{this.state.tableName}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>电话:</span>
              <span>{this.state.tableMobile}</span>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
              <Button type="normal" onClick={this.saveData}> 保存</Button>
            </Col>
          </Row>
          <Table dataSource={this.state.dataSource} getCellProps={this.getCellProps}>
            <Table.Column style={{ textAlign: 'center' }} width="10%" title="编号" cell={this.renderOrder} />
            <Table.Column
              style={{ textAlign: 'center' }}
              width="10%"
              title="产品名称"
              dataIndex="name"
            />
            <Table.Column
              style={{ textAlign: 'center' }}
              width="10%"
              title="产品单价"
              dataIndex="univalent"
            />
            <Table.Column
              width="15%"
              title="产品数量"
              cell={this.renderEditor.bind(this, 'quantity')}
            />
            <Table.Column
              width="15%"
              title="产品原数量"
              dataIndex="Dquantity"
            />
            <Table.Column style={{ textAlign: 'center' }} title="金额" width="10%" cell={this.getAmount} />
          </Table>
        </IceContainer>
        <Affix offsetBottom={this.state.top}>
          <IceLabel style={{ backgroundColor: '#fdd8e7', color: '#f5317f', fontSize: 14 }}>当前总价￥{this.state.totalPrice}</IceLabel>
        </Affix>
        <Affix offsetBottom={this.state.top2}>
          <IceLabel style={{ backgroundColor: '#fdd8e7', color: '#f5317f', fontSize: 14 }}>套餐总价￥{this.state.dataSource[14].amount}</IceLabel>
        </Affix>
      </div>
    );
  }
}
const styles = {
  formRow: {
    marginBottom: '18px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    lineHeight: '28px',
    paddingRight: '10px',
  },
};
