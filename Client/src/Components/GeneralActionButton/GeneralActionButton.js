import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react';
import styles from './GeneralActionButton.module.css';
import ValuesContext from '../../Contexts/ValuesContext';
import Lock from '../../Assets/lock.svg';
import Animation from '../../Assets/loading-animation.json';

const GeneralActionButton = (props) => {
  const ref = useRef(null);
  const [isClicked, setClickedState] = useState(false);

  const values = useContext(ValuesContext);
  const { amountEntered } = values;
  const { isFormComplete } = values;
  const { formCompletionHandler } = values;
  const { isPaymentProcessing } = values;
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
      onTouchStart={() => {
        setClickedState(true);
      }}
      onMouseUp={() => {
        setClickedState(false);
        if (ref.current) {
          ref.current.blur();
        }
      }}
      onTouchEnd={() => {
        setClickedState(false);
        if (ref.current) {
          ref.current.blur();
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.blur();
        }
        setClickedState(false);
      }}
      onClick={formCompletionHandler}
      onKeyDown={(event) => {
        if (event.code.toLowerCase() === 'enter') {
          formCompletionHandler();
        }
      }}
      role="button"
      tabIndex={0}
      ref={ref}
    >
      <div
        className={generalActionButtonClassNames}
      >
        <p
          className={styles.amountEnteredLabel}
        >
          {amountEntered !== '' ? `Pay $${amountEntered}.00` : children}
        </p>
      </div>
      <img
        className={isFormComplete && !isPaymentProcessing ? `${styles.lockIcon} ${styles.visible}` : `${styles.lockIcon}`}
        alt=""
        src={Lock}
      />
      {isPaymentProcessing && isFormComplete
        ? (
          <div
            className={styles.lottieContainer}
          >
            <Lottie
              animationData={Animation}
            />
          </div>
        ) : null}
    </div>
  );
};

GeneralActionButton.propTypes = {
  children: PropTypes.string
};

export default GeneralActionButton;
