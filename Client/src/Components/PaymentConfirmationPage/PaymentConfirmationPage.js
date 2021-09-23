import React from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentConfirmationPage.module.css';
import ContactForm from '../../Assets/contact-form.svg';
import CheckMark from '../../Assets/checkmark.svg';

const PaymentConfirmationPage = (props) => {
  const { amountPaid } = props;
  const { confirmationCode } = props;
  const { paymentDate } = props;
  const { paymentMethod } = props;

  return (
    <div
      className={styles.paymentConfirmationPage}
    >
      <div
        className={styles.svgContainer}
      >
        <img
          src={ContactForm}
          alt=""
          className={styles.contactForm}
        />
        <img
          src={CheckMark}
          alt=""
          className={styles.checkmark}
        />
      </div>
      <div
        className={styles.servicePaidContainer}
      >
        <p
          className={styles.servicePaidLabel}
        >
          Service Paid
        </p>
        <p
          className={styles.amountPaidLabel}
        >
          $
          {amountPaid}
        </p>
      </div>
      <div
        className={styles.container}
      >
        <span
          className={styles.rowHeaderLabel}
        >
          Confirmation Code
        </span>
        <span
          className={styles.rowValueLabel}
        >
          {confirmationCode}
        </span>
      </div>
      <div
        className={styles.container}
      >
        <span
          className={styles.rowHeaderLabel}
        >
          Payment Date
        </span>
        <span
          className={styles.rowValueLabel}
        >
          {paymentDate}
        </span>
      </div>
      <div
        className={styles.container}
      >
        <span
          className={styles.rowHeaderLabel}
        >
          Payment Method
        </span>
        <span
          className={styles.rowValueLabel}
        >
          {paymentMethod}
        </span>
      </div>
      <p
        className={styles.thankYouLabel}
      >
        Thank you for your payment
      </p>
    </div>
  );
};

PaymentConfirmationPage.propTypes = {
  amountPaid: PropTypes.string,
  confirmationCode: PropTypes.string,
  paymentDate: PropTypes.string,
  paymentMethod: PropTypes.string
};

export default PaymentConfirmationPage;
