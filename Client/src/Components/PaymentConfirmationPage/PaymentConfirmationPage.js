import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentConfirmationPage.module.css';
import ContactForm from '../../Assets/contact-form.svg';
import CheckMark from '../../Assets/checkmark.svg';

const PaymentConfirmationPage = (props) => {
  const paymentConfirmationPageRef = useRef();
  const { amountPaid } = props;
  const { confirmationCode } = props;
  const { paymentDate } = props;
  const { paymentMethod } = props;

  const rawDate = new Date(paymentDate);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const year = rawDate.getFullYear();
  const month = months[rawDate.getMonth()];
  const date = rawDate.getDate();
  const fullDate = `${month}, ${date} ${year}`;

  useEffect(() => {
    if (paymentConfirmationPageRef.current) {
      paymentConfirmationPageRef.current.classList.add(`${styles.visible}`);
    }
  });

  return (
    <div
      className={styles.paymentConfirmationPage}
      ref={paymentConfirmationPageRef}
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
          {fullDate}
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
