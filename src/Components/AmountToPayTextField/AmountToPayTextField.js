import React from 'react';
import styles from './AmountToPayTextField.module.css';

class AmountToPayTextField extends React.Component {
  constructor() {
    super();

    this.amountToPayTextFieldRef = React.createRef(null);
    this.state = {
      isFocused: false,
      enteredValue: ''
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
    this.setState({
      isFocused: false
    });
  }

  handleTextChange = (event) => {
    const regex = /^(([1-9]{1}\d{0,2})?)$/;

    if (!regex.test(event.target.value)) {
      this.setState({
      });
    } else {
      this.setState({
        enteredValue: event.target.value
      });
    }
  }

  render() {
    const { enteredValue } = this.state;
    const { isFocused } = this.state;

    return (
      <div
        className={isFocused ? `${styles.amountToPayTextFieldContainer} ${styles.focused}` : `${styles.amountToPayTextFieldContainer}`}
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
          value={enteredValue}
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
