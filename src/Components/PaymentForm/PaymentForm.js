import React from 'react';
import AmountToPayForm from '../AmountToPayForm/AmountToPayForm';
import ValuesContext from '../../Contexts/ValuesContext';
import TodaysDate from '../TodaysDate/TodaysDate';
import SectionLabel from '../SectionLabel/SectionLabel';
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

  handleAmountEnteredChanged = (value) => {
    console.log(value);
  }

  render() {
    const { name } = this.state;

    return (
      <div
        className={styles.overallGrid}
      >
        <div className={styles.paymentForm}>
          <TodaysDate />
          <SectionLabel
            type="dark"
          >
            Client Information
          </SectionLabel>
          <Grid
            columns="one"
          >
            <h1>Text</h1>
          </Grid>
          <Grid
            columns="two"
          >
            <h1>Text</h1>
          </Grid>
          <div className={styles.buttonContainer}>
            <h1>Text</h1>
          </div>
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
