import React from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentResponseError.module.css';

const PaymentResponseError = (props) => {
  const { children } = props;
  const { shouldDisplay } = props;

  return (
    <span
      className={shouldDisplay ? `${styles.paymentResponseError} ${styles.visible}` : `${styles.paymentResponseError}`}
    >
      {children}
    </span>
  );
};

PaymentResponseError.propTypes = {
  children: PropTypes.string,
  shouldDisplay: PropTypes.bool
};

export default PaymentResponseError;
