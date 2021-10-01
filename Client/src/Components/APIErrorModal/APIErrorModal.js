import React from 'react';
import PropTypes from 'prop-types';
import styles from './APIErrorModal.module.css';
import InfoIcon from '../../Assets/info-icon.svg';

const APIErrorModal = (props) => {
  const { children } = props;
  const { shouldDisplay } = props;

  return (
    <div
      className={shouldDisplay ? `${styles.apiErrorModal} ${styles.visible}` : `${styles.apiErrorModal}`}
    >
      <div
        className={styles.container}
      >
        <img
          className={styles.infoIcon}
          alt=""
          src={InfoIcon}
        />
        <span
          className={styles.apiErrorModalText}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

APIErrorModal.propTypes = {
  children: PropTypes.string.isRequired,
  shouldDisplay: PropTypes.bool.isRequired
};

export default APIErrorModal;
