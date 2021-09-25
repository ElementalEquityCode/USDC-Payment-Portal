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
    const { onChangeEvent } = this.props;
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

    onChangeEvent();
  }

  testInputAgainstRegex = (regex, value) => {
    if (regex.test(value) && value.trim().length > 0) {
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

  handleTextChange = (event, onChangeEvent) => {
    const { type } = this.props;
    let regex = /.*/;

    if (type === 'cardNumber') {
      regex = /^((\d{0,16})?)$/;
    } else if (type === 'cardExpiry') {
      regex = /(^(((\d{0,2})?(\/)(\d{0,4})?))$)?/;
    } else if (type === 'cardCVV') {
      regex = /^((\d{0,3})?)$/;
    }

    if (!regex.test(event.target.value)) {
      this.setState({
      });
    } else {
      this.setState({
        value: event.target.value
      }, () => {
        if (onChangeEvent) {
          onChangeEvent(event);
        }
      });
    }
  }

  render() {
    const { value } = this.state;
    const { shouldDisplayError } = this.props;
    const { isInErrorState } = this.state;
    const { isFocused } = this.state;
    const { type } = this.props;
    const { placeholder } = this.props;
    const { onChangeEvent } = this.props;

    let textFieldContainerClassNames = '';
    let inputType = 'text';
    let inputMode = '';

    if (isFocused) {
      textFieldContainerClassNames = `${styles.textFieldContainer} ${styles.focused}`;
    } else if (isInErrorState || shouldDisplayError) {
      textFieldContainerClassNames = `${styles.textFieldContainer} ${styles.error}`;
    } else {
      textFieldContainerClassNames = `${styles.textFieldContainer}`;
    }

    let maxLength = '50';

    if (type === 'email') {
      inputType = 'email';
    } else if (type === 'cardNumber') {
      inputType = 'number';
      maxLength = '16';
      inputMode = 'numeric';
    } else if (type === 'cardExpiry') {
      inputType = 'number';
      maxLength = '7';
      inputMode = 'numeric';
    } else if (type === 'cardCVV') {
      inputType = 'number';
      maxLength = '3';
      inputMode = 'numeric';
    }

    return (
      <div className={textFieldContainerClassNames}>
        <input
          value={value}
          maxLength={maxLength}
          className={styles.textField}
          type={inputType}
          inputMode={inputMode}
          placeholder={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={(event) => {
            this.handleTextChange(event, onChangeEvent);
          }}
        />
        <ExclamationError labelType="TextField" shouldDisplay={(isInErrorState && !isFocused) || (shouldDisplayError && value.length === 0)} />
      </div>
    );
  }
}

TextField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeEvent: PropTypes.func,
  shouldDisplayError: PropTypes.bool
};

export default TextField;
