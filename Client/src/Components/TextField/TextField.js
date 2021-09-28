import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextField.module.css';
import ExclamationError from '../ExclamationError/ExclamationError';
import CreditCardIcons from '../CreditCardIcons/CreditCardIcons';

const luhn = require('luhn');
const validator = require('email-validator');
const creditCardType = require('credit-card-type');
const CardType = require('credit-card-type').types;

class TextField extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      isFocused: false,
      isInErrorState: false
    };
  }

  prettyCardNumber = (cardNumber) => {
    const card = creditCardType.getTypeInfo(CardType.VISA);

    if (card) {
      const offsets = [].concat(0, card.gaps, cardNumber.length);
      const components = [];

      for (let i = 0; offsets[i] < cardNumber.length; i += 1) {
        const start = offsets[i];
        const end = Math.min(offsets[i + 1], cardNumber.length);
        components.push(cardNumber.substring(start, end));
      }

      return components.join(' ');
    }

    return cardNumber;
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
      this.testInputAgainstRegex(/^((\d{0,4})\s(\d{0,4})\s(\d{0,4})\s(\d{0,4})?)$/, value);
    } else if (type === 'cardExpiry') {
      this.testInputAgainstRegex(/^(((\d{2})(\/)(\d{4}))?)$/, value);
    } else if (type === 'cardCVV') {
      this.testInputAgainstRegex(/^((\d{3})?)$/, value);
    }

    onChangeEvent();
  }

  testInputAgainstRegex = (regex, value) => {
    const { type } = this.props;

    if (type === 'cardNumber') {
      if (regex.test(value) && value.trim().length > 0) {
        this.setState({
          isInErrorState: !luhn.validate(value),
          isFocused: false
        });
      } else {
        this.setState({
          isInErrorState: true,
          isFocused: false
        });
      }
    } else if (type !== 'cardNumber') {
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
  }

  handleTextChange = (event, onChangeEvent) => {
    const { type } = this.props;
    let regex = /.*/;
    let formattedCardNumber = event.target.value;

    if (type === 'cardNumber') {
      regex = /^(((\d{0,4})(\s?)(\d{0,4})(\s?)(\d{0,4})(\s?)(\d{0,4}))?)$/;
      formattedCardNumber = this.prettyCardNumber(event.target.value.replace(/\s/g, ''));
    } else if (type === 'cardExpiry') {
      regex = /(^((\d{0,2})?(\/)(\d{0,4})?))$/;
    } else if (type === 'cardCVV') {
      regex = /^((\d{0,3})?)$/;
    }

    if (!regex.test(event.target.value)) {
      this.setState({
      });
    } else {
      this.setState({
        value: type === 'cardNumber' ? formattedCardNumber : event.target.value
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
      inputType = 'text';
      maxLength = '19';
      inputMode = 'numeric';
    } else if (type === 'cardExpiry') {
      inputType = 'text';
      maxLength = '7';
      inputMode = 'numeric';
    } else if (type === 'cardCVV') {
      inputType = 'text';
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
        {type === 'cardNumber' ? (
          <CreditCardIcons
            shouldDisplay={!shouldDisplayError}
            cardNumber={value}
          />
        ) : null}
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
