import React from 'react';
import styles from './AmountToPayForm.module.css';
import AmountToPayTextField from '../AmountToPayTextField/AmountToPayTextField';
import SectionLabel from '../SectionLabel/SectionLabel';
import PaymentFromTo from '../PaymentFromTo/PaymentFromTo';

class AmountToPayForm extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.amountToPayForm}>
        <SectionLabel
          type="light"
        >
          Enter Amount to Pay
        </SectionLabel>

        <AmountToPayTextField />

        <PaymentFromTo
          to="Ian Robinson"
        />
      </div>
    );
  }
}

export default AmountToPayForm;
