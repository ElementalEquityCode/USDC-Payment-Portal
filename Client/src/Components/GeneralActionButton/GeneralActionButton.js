import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './GeneralActionButton.module.css';
import ValuesContext from '../../Contexts/ValuesContext';
import Lock from '../../Assets/lock.svg';

const GeneralActionButton = (props) => {
  const [isClicked, setClickedState] = useState(false);

  const values = useContext(ValuesContext);
  const { amountEntered } = values;
  const { isFormComplete } = values;
  const { formCompletionHandler } = values;
  const { children } = props;

  let generalActionButtonClassNames = '';

  if (isFormComplete) {
    generalActionButtonClassNames = `${styles.generalActionButton}`;
  } else {
    generalActionButtonClassNames = `${styles.generalActionButton} ${styles.incompleteForm}`;
  }

  return (
    <div
      className={!isClicked ? `${styles.generalActionButtonContainer}` : `${styles.generalActionButtonContainer} ${styles.clicked}`}
      onMouseDown={() => {
        setClickedState(true);
      }}
      onMouseUp={() => {
        setClickedState(false);
      }}
      onMouseLeave={() => {
        setClickedState(false);
      }}
      onClick={formCompletionHandler}
      onKeyDown={formCompletionHandler}
      role="button"
      tabIndex={0}
    >
      <div
        className={generalActionButtonClassNames}
      >
        <p
          className={styles.amountEnteredLabel}
        >
          {amountEntered !== '' ? `Pay $${amountEntered}.00` : children}
        </p>
        <img
          className={isFormComplete ? `${styles.lockIcon} ${styles.visible}` : `${styles.lockIcon}`}
          alt=""
          src={Lock}
        />
      </div>
    </div>
  );
};

GeneralActionButton.propTypes = {
  children: PropTypes.string
};

export default GeneralActionButton;
