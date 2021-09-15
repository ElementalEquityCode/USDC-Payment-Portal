import React from 'react';
import styles from './AmountToPayTextField.module.css';

class AmountToPayTextField extends React.Component {
  constructor() {
    super();

    this.amountToPayTextFieldRef = React.createRef(null);
    this.state = {
      isFocused: false,
      isInErrorState: false,
      value: ''
    };
  }

  handleAmountToPayTextFieldContainerClicked = () => {
    const { isFocused } = this.state;

    if (this.amountToPayTextFieldRef !== null) {
      if (!isFocused) {
        this.amountToPayTextFieldRef.current.focus();
        this.setState({
          isFocused: true
        });
      }
    }
  }

  handleAmountToPayTextFieldSetFocused = () => {
    this.setState({
      isFocused: true
    });
  }

  handleAmountToPayTextFieldBlured = () => {
    const { value } = this.state;

    this.setState({
      isFocused: false,
      isInErrorState: value === ''
    });
  }

  handleTextChange = (event) => {
    const regex = /^(([1-9]{1}\d{0,2})?)$/;

    if (!regex.test(event.target.value)) {
      this.setState({
      });
    } else {
      this.setState({
        value: event.target.value
      });
    }
  }

  render() {
    const { isInErrorState } = this.state;
    const { value } = this.state;
    const { isFocused } = this.state;

    let amountToPayTextFiedlContainerClassNames = '';

    if (isFocused) {
      amountToPayTextFiedlContainerClassNames = `${styles.amountToPayTextFieldContainer} ${styles.focused}`;
    } else if (isInErrorState) {
      amountToPayTextFiedlContainerClassNames = `${styles.amountToPayTextFieldContainer} ${styles.error}`;
    } else {
      amountToPayTextFiedlContainerClassNames = `${styles.amountToPayTextFieldContainer}`;
    }

    return (
      <div
        className={amountToPayTextFiedlContainerClassNames}
        onMouseDown={(event) => {
          if (!isFocused) {
            this.handleAmountToPayTextFieldContainerClicked();
            event.preventDefault();
          }
        }}
        onKeyDown={this.handleAmountToPayTextFieldContainerClicked}
        role="textbox"
        tabIndex={0}
      >
        <div className={styles.dollarSignContainer}>
          <span className={styles.dollarSign}>$</span>
        </div>
        <input
          value={value}
          type="text"
          className={styles.amountToPayTextField}
          placeholder="0.00"
          onFocus={this.handleAmountToPayTextFieldSetFocused}
          onBlur={this.handleAmountToPayTextFieldBlured}
          ref={this.amountToPayTextFieldRef}
          onChange={(event) => {
            this.handleTextChange(event);
          }}
        />
      </div>
    );
  }
}

export default AmountToPayTextField;
