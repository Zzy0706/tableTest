/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { Input } from '@icedesign/base';

export default class CellEditor extends Component {
  static displayName = 'CellEditor';

  constructor(props) {
    super(props);

    this.tempValue = '';
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }


  onValueChange = (value) => {
    /*
    const res = '^[0-9]*[1-9][0-9]*$';
    if (!value.match(res)) {
      return;
    }
    */
    this.setState({
      value,
    });
    const { index, valueKey } = this.props;
    this.props.onChange && this.props.onChange(index, valueKey, value);
  };

  updateValue = () => {
    const { index, valueKey } = this.props;
    const value = this.state.value;
    /*
    const res = '^[0-9]*[1-9][0-9]*$';
    if (!value.match(res)) {
      return;
    }
    */
    this.props.onChange && this.props.onChange(index, valueKey, value);
  };

  rollBackThisCell = () => {
    this.setState({
      value: this.tempValue,
    });
    this.tempValue = '';
  };

  render() {
    const { value } = this.state;
    const { index } = this.props;
    if (index === 12) {
      return (
        <div className="celleditor">
          <span>{value}</span>
        </div>
      );
    }
    return (
      <div className="celleditor">
        <Input
          style={styles.cellInput}
          value={value}
          onChange={this.onValueChange}
        />
      </div>
    );
  }
}

const styles = {
  cellInput: {
    width: 'calc(100% - 44px)',
  },
  operationIcon: {
    marginLeft: '10px',
    color: '#999',
    cursor: 'pointer',
  },
};
