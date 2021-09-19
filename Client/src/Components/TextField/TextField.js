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
    } else if (type === 'cardNumber') {
      this.testInputAgainstRegex(/^((\d{16})?)$/, value);
    } else if (type === 'cardExpiry') {
      this.testInputAgainstRegex(/^(((\d{2})(\/)(\d{4}))?)$/, value);
    } else if (type === 'cardCVV') {
      this.testInputAgainstRegex(/^((\d{3})?)$/, value);
    }
  }

  testInputAgainstRegex = (regex, value) => {
    if (regex.test(value)) {
      this.setState({
        isInErrorState: false,
        isFocused: false
      });
    } else {
      this.setState({
        isInErrorState: true,
        isFocused: false
      });
    }
  }

  render() {
    const { isInErrorState } = this.state;
    const { isFocused } = this.state;
    const { type } = this.props;
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

    let maxLength = '50';

    if (type === 'cardNumber') {
      maxLength = '16';
    } else if (type === 'cardExpiry') {
      maxLength = '7';
    } else if (type === 'cardCVV') {
      maxLength = '3';
    }

    return (
      <div className={textFieldContainerClassNames}>
        <input
          maxLength={maxLength}
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
        <ExclamationError labelType="TextField" shouldDisplay={isInErrorState && !isFocused} />
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
