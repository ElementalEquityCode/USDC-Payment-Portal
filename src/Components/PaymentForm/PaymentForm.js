import React from 'react';
import { TextField, Button } from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/Subtitles';
import CalendarIcon from '@material-ui/icons/Today';
import NumberIcon from '@material-ui/icons/FormatListNumbered';
import InputAdornment from '@material-ui/core/InputAdornment';
import AmountToPayForm from '../AmountToPayForm/AmountToPayForm';
import NameContext from '../../Contexts/NameContext';
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

  render() {
    const { name } = this.state;

    return (
      <div
        className={styles.overallGrid}
      >
        <div className={styles.paymentForm}>
          <SectionLabel
            type="dark"
          >
            Client Information
          </SectionLabel>
          <Grid
            columns="one"
          >
            <TextField
              value={name}
              label="Name on Card"
              fullWidth
              onChange={(event) => {
                this.handleNameChanged(event);
              }}
            />
            <TextField
              label="Email"
              fullWidth
            />
          </Grid>
          <SectionLabel
            type="dark"
          >
            Card Information
          </SectionLabel>
          <Grid
            colums="one"
          >
            <TextField
              label="Card Number"
              InputProps={{
                startAdornment: <InputAdornment position="start"><CreditCardIcon /></InputAdornment>
              }}
            />
          </Grid>
          <Grid
            columns="two"
          >
            <TextField
              label="Expiry"
              InputProps={{
                startAdornment: <InputAdornment position="start"><CalendarIcon /></InputAdornment>
              }}
            />
            <TextField
              label="CVV"
              InputProps={{
                startAdornment: <InputAdornment position="start"><NumberIcon /></InputAdornment>
              }}
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
        <div className={styles.amountToPayForm}>
          <NameContext.Provider value={name}>
            <AmountToPayForm />
          </NameContext.Provider>
        </div>
      </div>
    );
  }
}

export default PaymentForm;
