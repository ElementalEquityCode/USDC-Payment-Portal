import React from 'react';
import styles from './AmountToPayTextField.module.css';
import ExclamationError from '../ExclamationError/ExclamationError';
import ValuesContext from '../../Contexts/ValuesContext';

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

  handleAmountToPayTextFieldBlured = (consumerValue) => {
    const { value } = this.state;

    this.setState({
      isFocused: false,
      isInErrorState: value === ''
    });

    consumerValue.handleAmountEnteredChanged({
      value,
      wasBlured: true
    });
  }

  handleTextChange = (event, consumerValue) => {
    const regex = /^(([1-9]{1}\d{0,2})?)$/;

    if (!regex.test(event.target.value)) {
      this.setState({
      });
    } else {
      this.setState({
        value: event.target.value
      }, () => {
        const { value } = this.state;
        consumerValue.handleAmountEnteredChanged({
          value,
          wasBlured: false
        });
      });
    }
  }

  render() {
    const { isInErrorState } = this.state;
    const { value } = this.state;
    const { isFocused } = this.state;

    let amountToPayTextFieldContainerClassNames = '';

    if (isFocused) {
      amountToPayTextFieldContainerClassNames = `${styles.amountToPayTextFieldContainer} ${styles.focused}`;
    } else if (isInErrorState) {
      amountToPayTextFieldContainerClassNames = `${styles.amountToPayTextFieldContainer} ${styles.error}`;
    } else {
      amountToPayTextFieldContainerClassNames = `${styles.amountToPayTextFieldContainer}`;
    }

    return (
      <div className={styles.container}>
        <ValuesContext.Consumer>
          {(consumerValue) => (
            <>
              <div
                className={!amountToPayTextFieldContainerClassNames.includes(`${styles.error}`) && consumerValue.shouldDisplayAmountEnteredError ? `${amountToPayTextFieldContainerClassNames} ${styles.error}` : amountToPayTextFieldContainerClassNames}
                onMouseDown={(event) => {
                  if (!isFocused) {
                    this.handleAmountToPayTextFieldContainerClicked();
                    event.preventDefault();
                  } else if (isFocused) {
                    if (event.target !== this.amountToPayTextFieldRef.current) {
                      event.preventDefault();
                    }
                  }
                }}
                onKeyDown={this.handleAmountToPayTextFieldContainerClicked}
                role="textbox"
                tabIndex={0}
              >
                <div
                  className={styles.dollarSignContainer}
                >
                  <span
                    className={styles.dollarSign}
                  >
                    $
                  </span>
                </div>
                <input
                  value={value}
                  type="text"
                  inputMode="numeric"
                  className={styles.amountToPayTextField}
                  placeholder="0.00"
                  onFocus={this.handleAmountToPayTextFieldSetFocused}
                  onBlur={() => {
                    this.handleAmountToPayTextFieldBlured(consumerValue);
                  }}
                  ref={this.amountToPayTextFieldRef}
                  onChange={(event) => {
                    this.handleTextChange(event, consumerValue);
                  }}
                />
              </div>
              <ExclamationError
                shouldDisplay={(isInErrorState && !isFocused)
              || (consumerValue.shouldDisplayAmountEnteredError && value.length === 0)}
              />
            </>
          )}
        </ValuesContext.Consumer>
      </div>
    );
  }
}

export default AmountToPayTextField;
