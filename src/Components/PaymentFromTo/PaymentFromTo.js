import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentFromTo.module.css';
import NameContext from '../../Contexts/NameContext';

const PaymentFromTo = (props) => {
  const from = useContext(NameContext);
  console.log(`Printing the from ${from}`);
  const { to } = props;

  return (
    <div className={styles.paymentFromTo}>
      <div className={styles.innerContainer}>
        <p className={styles.text}>From</p>
        <p className={styles.text}>{from}</p>
        <p className={styles.text}>To</p>
        <p className={styles.text}>{to}</p>
      </div>
    </div>
  );
};

PaymentFromTo.propTypes = {
  to: PropTypes.string
};

export default PaymentFromTo;
