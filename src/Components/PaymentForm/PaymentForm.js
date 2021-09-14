import React from 'react';
import AmountToPayForm from '../AmountToPayForm/AmountToPayForm';
import ValuesContext from '../../Contexts/ValuesContext';
import TodaysDate from '../TodaysDate/TodaysDate';
import SectionLabel from '../SectionLabel/SectionLabel';
import TextField from '../TextField/TextField';
import GeneralActionButton from '../GeneralActionButton/GeneralActionButton';
import Grid from '../Grid/Grid';
import styles from './PaymentForm.module.css';

class PaymentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: ''
    };
  }

  handleNameChanged = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  handleAmountEnteredChanged = () => {
  }

  render() {
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
              placeholder="Name"
            />
            <TextField
              placeholder="Email"
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
          <GeneralActionButton>Enter Amount to Pay</GeneralActionButton>
        </div>
        <div className={styles.amountToPayForm}>
          <ValuesContext.Provider value={name}>
            <AmountToPayForm />
          </ValuesContext.Provider>
        </div>
      </div>
    );
  }
}

export default PaymentForm;
