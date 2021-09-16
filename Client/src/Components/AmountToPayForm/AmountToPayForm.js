import React from 'react';
import styles from './AmountToPayForm.module.css';
import Grid from '../Grid/Grid';
import AmountToPayTextField from '../AmountToPayTextField/AmountToPayTextField';
import SectionLabel from '../SectionLabel/SectionLabel';
import PaymentFromTo from '../PaymentFromTo/PaymentFromTo';
import GeneralActionButton from '../GeneralActionButton/GeneralActionButton';

class AmountToPayForm extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.amountToPayForm}>
        <Grid>
          <SectionLabel
            type="dark"
          >
            Enter Amount to Pay
          </SectionLabel>

          <AmountToPayTextField />

          <PaymentFromTo
            to="Ian Robinson"
          />

          <GeneralActionButton>Enter Amount to Pay</GeneralActionButton>
        </Grid>
      </div>
    );
  }
}

export default AmountToPayForm;
