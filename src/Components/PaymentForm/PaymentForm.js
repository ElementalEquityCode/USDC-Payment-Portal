import React from 'react';
import { TextField } from '@material-ui/core';
import SectionLabel from '../SectionLabel/SectionLabel';
import Grid from '../Grid/Grid';
import styles from './PaymentForm.module.css';

class PaymentForm extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <div className={styles.paymentForm}>
        <SectionLabel>Client Information</SectionLabel>
        <Grid
          columns="one"
        >
          <TextField
            label="Name on Card"
            fullWidth
          />
          <TextField
            label="Email"
            fullWidth
          />
        </Grid>
        <SectionLabel>Card Information</SectionLabel>
        <Grid
          columns="three"
        >
          <TextField
            label="Card Number"
          />
          <TextField
            label="Expiry"
          />
          <TextField
            label="CVV"
          />
        </Grid>
      </div>
    );
  }
}

export default PaymentForm;
