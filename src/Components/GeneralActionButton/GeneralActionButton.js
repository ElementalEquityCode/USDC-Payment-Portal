import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './GeneralActionButton.module.css';
import ValuesContext from '../../Contexts/ValuesContext';

const GeneralActionButton = (props) => {
  const { amountEntered } = useContext(ValuesContext);
  const { children } = props;

  return (
    <div
      className={styles.generalActionButton}
    >
      {amountEntered !== '' ? `Pay $${amountEntered}.00` : children}
    </div>
  );
};

GeneralActionButton.propTypes = {
  children: PropTypes.string
};

export default GeneralActionButton;
