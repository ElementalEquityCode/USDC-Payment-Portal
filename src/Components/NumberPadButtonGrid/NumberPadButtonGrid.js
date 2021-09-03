import React from 'react';
import PropTypes from 'prop-types';
import styles from './NumberPadButtonGrid.module.css';

const NumberPadButtonGrid = (props) => {
  const { children } = props;

  return (
    <div className={styles.numberPadButtonGrid}>
      {children}
    </div>
  );
};

NumberPadButtonGrid.propTypes = {
  children: PropTypes.elementType
};

export default NumberPadButtonGrid;
