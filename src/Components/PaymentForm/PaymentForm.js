import React from 'react';
import { TextField, Button } from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/Subtitles';
import InputAdornment from '@material-ui/core/InputAdornment';
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
      <Grid
        columns="one"
        className={styles.overallGrid}
      >
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
              InputProps={{
                startAdornment: <InputAdornment position="start"><CreditCardIcon /></InputAdornment>
              }}
            />
            <TextField
              label="Expiry"
            />
            <TextField
              label="CVV"
            />
          </Grid>
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              className={styles.payButton}
              sx={{
                width: 100,
              }}
              style={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                backgroundColor: 'rgb(67, 52, 189)'
              }}
            >
              Pay $0.00
            </Button>
          </div>
        </div>
      </Grid>
    );
  }
}

export default PaymentForm;
