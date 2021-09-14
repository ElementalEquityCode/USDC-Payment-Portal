import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentFromTo.module.css';
import ValuesContext from '../../Contexts/ValuesContext';

const PaymentFromTo = (props) => {
  const name = useContext(ValuesContext);
  const { to } = props;

  return (
    <div className={styles.paymentFromTo}>
      <div className={styles.innerContainer}>
        <p className={styles.text}>
          From:
          {` ${name}`}
        </p>
        <p className={styles.text}>
          To:
          {` ${to}`}
        </p>
      </div>
    </div>
  );
};

PaymentFromTo.propTypes = {
  to: PropTypes.string
};

export default PaymentFromTo;
