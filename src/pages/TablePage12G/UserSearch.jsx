/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Input, Button, Grid } from '@icedesign/base';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class UserTable extends Component {
  static displayName = 'UserTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
    };
  }

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      formValue: value,
    });
  };
  saveData = () => {
    console.log(this.state.formValue);
  }
  render() {
    const { formValue } = this.state;

    return (
      <IceContainer title="搜索">
        <FormBinderWrapper value={formValue} onChange={this.formChange}>
          <Row wrap>
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>姓名:</span>
              <FormBinder name="name">
                <Input />
              </FormBinder>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
              <span style={styles.label}>电话:</span>
              <FormBinder name="phone">
                <Input />
              </FormBinder>
            </Col>
            <Col xxs="24" l="8" style={styles.formCol}>
              <Button type="normal" onClick={this.saveData}> 保存</Button>
            </Col>
          </Row>
        </FormBinderWrapper>
      </IceContainer>
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
