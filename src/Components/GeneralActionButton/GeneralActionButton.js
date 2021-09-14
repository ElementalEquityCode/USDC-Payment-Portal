import React from 'react';
import PropTypes from 'prop-types';
import styles from './GeneralActionButton.module.css';

const GeneralActionButton = (props) => {
  const { children } = props;

  return (
    <div
      className={styles.generalActionButton}
    >
      {children}
    </div>
  );
};

GeneralActionButton.propTypes = {
  children: PropTypes.string
};

export default GeneralActionButton;
