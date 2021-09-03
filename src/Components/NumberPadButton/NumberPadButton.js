import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumberPadButton.module.css';

const NumberPadButton = (props) => {
  const { children } = props;

  return (
    <h6 className={styles.numberPadButton}>{children}</h6>
  );
};

NumberPadButton.propTypes = {
  children: PropTypes.string
};

export default NumberPadButton;
