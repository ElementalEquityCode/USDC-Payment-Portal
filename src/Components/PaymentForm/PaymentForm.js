import React from 'react';
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
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default PaymentForm;
