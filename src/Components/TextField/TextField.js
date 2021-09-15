import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextField.module.css';
import ExclamationError from '../ExclamationError/ExclamationError';

const validator = require('email-validator');

class TextField extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      isFocused: false,
      isInErrorState: false
    };
  }

  handleFocus = () => {
    this.setState({
      isFocused: true
    });
  }

  handleBlur = () => {
    const { type } = this.props;
    const { value } = this.state;

    if (type === 'name') {
      this.setState({
        isInErrorState: value.trim() === '',
        isFocused: false
      });
    } else if (type === 'email') {
      this.setState({
        isInErrorState: !validator.validate(value.trim()),
        isFocused: false
      });
    } else {
      this.setState({
        isInErrorState: false,
        isFocused: false
      });
    }
  }

  render() {
    const { isInErrorState } = this.state;
    const { isFocused } = this.state;
    const { placeholder } = this.props;
    const { onChangeEvent } = this.props;

    let textFieldContainerClassNames = '';

    if (isFocused) {
      textFieldContainerClassNames = `${styles.textFieldContainer} ${styles.focused}`;
    } else if (isInErrorState) {
      textFieldContainerClassNames = `${styles.textFieldContainer} ${styles.error}`;
    } else {
      textFieldContainerClassNames = `${styles.textFieldContainer}`;
    }

    return (
      <div className={textFieldContainerClassNames}>
        <input
          className={styles.textField}
          type="text"
          placeholder={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={(event) => {
            if (onChangeEvent !== undefined) {
              onChangeEvent(event);
            }

            this.setState({
              value: event.target.value
            });
          }}
        />
        {isInErrorState && !isFocused ? <ExclamationError /> : null}
      </div>
    );
  }
}

TextField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeEvent: PropTypes.func
};

export default TextField;
