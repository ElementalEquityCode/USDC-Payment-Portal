import React from 'react';
import AmountToPayForm from '../AmountToPayForm/AmountToPayForm';
import ValuesContext from '../../Contexts/ValuesContext';
import TodaysDate from '../TodaysDate/TodaysDate';
import SectionLabel from '../SectionLabel/SectionLabel';
import TextField from '../TextField/TextField';
import Grid from '../Grid/Grid';
import styles from './PaymentForm.module.css';

const validator = require('email-validator');

class PaymentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      amountEntered: '',
      isFormComplete: false
    };
  }

  handleAmountEnteredChanged = (value) => {
    this.setState({
      amountEntered: value
    }, () => {
      this.checkIfFormIsComplete();
    });
  }

  handleEmailChanged = (event) => {
    this.setState({
      email: event.target.value
    }, () => {
      this.checkIfFormIsComplete();
    });
  }

  handleNameChanged = (event) => {
    this.setState({
      name: event.target.value
    }, () => {
      this.checkIfFormIsComplete();
    });
  }

  checkIfFormIsComplete = () => {
    const { name } = this.state;
    const { email } = this.state;
    const { amountEntered } = this.state;

    if (name.trim() !== '' && validator.validate(email.trim()) && amountEntered !== '') {
      this.setState({
        isFormComplete: true
      });
    } else {
      this.setState({
        isFormComplete: false
      });
    }
  }

  formCompletionHandler = () => {
    const { isFormComplete } = this.state;

    if (isFormComplete) {
      console.log('Perform API request');
    }
  }

  render() {
    const { isFormComplete } = this.state;
    const { amountEntered } = this.state;
    const { name } = this.state;

    return (
      <div
        className={styles.overallGrid}
      >
        <div className={styles.paymentForm}>
          <TodaysDate />
          <Grid
            columns="one"
          >
            <SectionLabel
              type="dark"
            >
              Client Information
            </SectionLabel>
            <TextField
              type="name"
              placeholder="Name"
              onChangeEvent={this.handleNameChanged}
            />
            <TextField
              type="email"
              placeholder="Email"
              onChangeEvent={this.handleEmailChanged}
            />
          </Grid>
          <Grid
            columns="one"
          >
            <SectionLabel
              type="dark"
            >
              Card Information
            </SectionLabel>
            <TextField
              placeholder="1234 1234 1234 1234"
            />
            <TextField
              placeholder="MM/YY"
            />
            <TextField
              placeholder="CVC"
            />
          </Grid>
        </div>
        <div className={styles.amountToPayForm}>
          <ValuesContext.Provider value={{
            name,
            handleAmountEnteredChanged: this.handleAmountEnteredChanged,
            amountEntered,
            isFormComplete,
            formCompletionHandler: this.formCompletionHandler
          }}
          >
            <AmountToPayForm />
          </ValuesContext.Provider>
        </div>
      </div>
    );
  }
}

export default PaymentForm;
