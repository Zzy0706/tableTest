import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Feedback, Table, Affix, Grid, Input, Button, moment } from '@icedesign/base';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
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
        {
          name: '4:1营养健酮生酮营养粉',
          univalent: 400,
          quantity: 18,
          Dquantity: 18,
          Zquantity: 18,
          Cquantity: 0,
          amount: 7200,
          unit: '罐',
        },
        {
          name: '生酮膳食纤维',
          univalent: 240,
          quantity: 1,
          Dquantity: 1,
          Zquantity: 1,
          Cquantity: 0,
          amount: 240,
          unit: '罐',
        },
        {
          name: '生酮专用油',
          univalent: 200,
          quantity: 1,
          Dquantity: 1,
          Zquantity: 1,
          Cquantity: 0,
          amount: 200,
          unit: '瓶',
        },
        {
          name: '左旋肉碱果味固体饮料',
          univalent: 150,
          quantity: 2,
          Dquantity: 2,
          Zquantity: 2,
          Cquantity: 0,
          amount: 300,
          unit: '盒',
        },
        {
          name: 'DHA&ARA固体饮料',
          univalent: 260,
          quantity: 1,
          Dquantity: 1,
          Zquantity: 1,
          Cquantity: 0,
          amount: 260,
          unit: '盒',
        },
        {
          name: '健酮特膳粉',
          univalent: 450,
          quantity: 1,
          Dquantity: 1,
          Zquantity: 1,
          Cquantity: 0,
          amount: 450,
          unit: '罐',
        },
        {
          name: '健酮营养饼干',
          univalent: 120,
          quantity: 1,
          Dquantity: 1,
          Zquantity: 1,
          Cquantity: 0,
          amount: 120,
          unit: '盒',
        },
        {
          name: '尿酮试纸',
          univalent: 25,
          quantity: 1,
          Dquantity: 1,
          Zquantity: 1,
          Cquantity: 0,
          amount: 25,
          unit: '盒',
        },
        {
          name: '尿隐血试纸',
          univalent: 10,
          quantity: 1,
          Dquantity: 1,
          Zquantity: 1,
          Cquantity: 0,
          amount: 10,
          unit: '盒',
        },
        {
          name: '血酮试纸',
          univalent: 150,
          quantity: 3,
          Dquantity: 3,
          Zquantity: 3,
          Cquantity: 0,
          amount: 450,
          unit: '盒',
        },
        {
          name: '血酮仪器',
          univalent: 450,
          quantity: 1,
          Dquantity: 1,
          Zquantity: 1,
          Cquantity: 0,
          amount: 450,
          unit: '台',
        },
        {
          name: '知情同意书、资料',
          univalent: 0,
          quantity: 1,
          Dquantity: 1,
          Zquantity: 1,
          Cquantity: 0,
          amount: 0,
          unit: '套',
        },
        {
          name: '套餐总价',
          amount: 9705,
        },
      ],
      totalPrice: '',
      top: 50,
      top2: 25,
      formValue: {},
      inputDisabled: false,
    };
  }

  renderOrder = (value, index) => {
    return <span>{index + 1}</span>;
  };

  changeDataSource = (index, valueKey, value) => { // TODO: 在这里下功夫!
    defaultTotalIndex = 0;
    this.state.dataSource[index][valueKey] = value;
    if (this.state.dataSource[index][valueKey] > this.state.dataSource[index].quantity) {
      this.state.dataSource[index].Dquantity = 0;
    } else {
      this.state.dataSource[index].Dquantity = this.state.dataSource[index].quantity - value;
    }
    this.state.dataSource[index].Zquantity = parseInt(value, 10) + this.state.dataSource[index].Dquantity;
    this.state.dataSource[index].amount = this.state.dataSource[index].Zquantity * this.state.dataSource[index].univalent;
    this.setState({
      dataSource: this.state.dataSource,
    });
    this.getTotalPrice();
  };
  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };
  saveData = () => {
    const { formValue } = this.state;
    formValue.tableFlag = 3;
    formValue.tablePackagePrice = 9705;
    if (this.state.totalPrice) {
      formValue.tableActualPrice = this.state.totalPrice;
    } else {
      formValue.tableActualPrice = 9705;
    }
    formValue.tableData = JSON.stringify(this.state.dataSource);
    formValue.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(formValue);
    axios.post('http://api.ers.wkclz.com/cms/tabletest/new',
      formValue,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
      if (response.data.code === 1) {
        Feedback.toast.success('保存成功');
      }
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }
  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        showInput={this.state.inputDisabled}
        onChange={this.changeDataSource}
      />
    );
  };
  showAlert = () => {
    const data = this.state.totalPrice;
    if (defaultTotalIndex === 0) {
      console.log(`目前金额${data}小于初始金额${defaultTotalPrice}`);
      Feedback.toast.prompt(`目前金额${data}小于初始金额${defaultTotalPrice}`);
    }
    defaultTotalIndex += 1;
  }
  getTotalPrice = () => {
    const data = Object.assign([], this.state.dataSource);
    let totalPrice = 0;
    delete data[12];
    data.map((item) => {
      totalPrice += item.amount;
      return null;
    });
    if (defaultIndex === 0) {
      defaultTotalPrice = totalPrice;
    }
    this.state.totalPrice = totalPrice;
    defaultIndex += 1;
    if (totalPrice < defaultTotalPrice) {
      this.showAlert();
    }
    this.setState({
      totalPrice,
    });
    return <span>{`￥${totalPrice}`} </span>;
  }
  getAmount =(value, index) => {
    if (index === 12) {
      return <span>{this.state.dataSource[index].amount}</span>;
    }
    const amount = this.state.dataSource[index].univalent * this.state.dataSource[index].Zquantity;
    return <span>{amount}</span>;
  }
  getCellProps = (rowIndex, colIndex) => {
    if (rowIndex === 0 && colIndex === 8) {
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
  componentDidMount() {
    this.getTotalPrice();
  }
  lockingData =() => { // 锁定后
    this.setState({
      inputDisabled: !this.state.inputDisabled,
    });
    if (this.state.totalPrice < this.state.dataSource[12].amount) {
      console.log(this.state.dataSource[12].amount - this.state.totalPrice);
    }
  }
  render() {
    const { formValue } = this.state;
    return (
      <div className="editable-table">
        <IceContainer>
          <Affix offsetTop={this.state.top}>
            <Button type="primary" onClick={this.lockingData}>{this.state.inputDisabled ? '解锁' : '锁定' }</Button>
          </Affix>
          <FormBinderWrapper value={formValue} onChange={this.formChange}>
            <Row wrap>
              <Col xxs="24" l="8" style={styles.formCol}>
                <span style={styles.label}>姓名:</span>
                <FormBinder name="tableName">
                  <Input />
                </FormBinder>
              </Col>
              <Col xxs="24" l="8" style={styles.formCol}>
                <span style={styles.label}>医院:</span>
                <FormBinder name="tableHospital">
                  <Input />
                </FormBinder>
              </Col>
              <Col xxs="24" l="8" style={styles.formCol}>
                <span style={styles.label}>营养师:</span>
                <FormBinder name="tableDietitian">
                  <Input />
                </FormBinder>
              </Col>
              <Col xxs="24" l="8" style={styles.formCol}>
                <Button type="normal" onClick={this.saveData}> 保存</Button>
              </Col>
            </Row>
          </FormBinderWrapper>
          <Table dataSource={this.state.dataSource} getCellProps={this.getCellProps}>
            <Table.Column style={{ textAlign: 'center' }} width="10%" title="编号" cell={this.renderOrder} />
            <Table.Column
              style={{ textAlign: 'center' }}
              width="10%"
              title="产品"
              dataIndex="name"
            />
            <Table.Column
              style={{ textAlign: 'center' }}
              width="10%"
              title="产品单价"
              dataIndex="univalent"
            />
            <Table.Column
              width="20%"
              title="产品数量"
              cell={this.renderEditor.bind(this, 'Cquantity')}
            />
            <Table.Column
              width="15%"
              title="产品原数量"
              dataIndex="Dquantity"
            />
            <Table.Column
              style={{ textAlign: 'center' }}
              width="10%"
              title="单位"
              dataIndex="unit"
            />
            <Table.Column
              width="15%"
              title="总数量"
              dataIndex="Zquantity"
            />
            <Table.Column style={{ textAlign: 'center' }} title="金额" width="10%" cell={this.getAmount} />
          </Table>
        </IceContainer>
        <Affix offsetBottom={this.state.top}>
          <IceLabel style={{ backgroundColor: '#fdd8e7', color: '#f5317f', fontSize: 14 }}>当前总价￥{this.state.totalPrice}</IceLabel>
        </Affix>
        <Affix offsetBottom={this.state.top2}>
          <IceLabel style={{ backgroundColor: '#fdd8e7', color: '#f5317f', fontSize: 14 }}>套餐总价￥{this.state.dataSource[12].amount}</IceLabel>
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
