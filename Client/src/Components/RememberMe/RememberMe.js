import React, { useState, useContext, useEffect } from 'react';
import styles from './RememberMe.module.css';
import ValuesContext from '../../Contexts/ValuesContext';
import SectionLabel from '../SectionLabel/SectionLabel';

const RememberMe = () => {
  const { rememberMeHandler } = useContext(ValuesContext);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    if (!isChecked && localStorage.getItem('first-name') && localStorage.getItem('last-name') && localStorage.getItem('email')) {
      setChecked(true);
      rememberMeHandler(true);
    }
  }, []);

  return (
    <div
      className={styles.remembeMeContainer}
      onClick={() => {
        rememberMeHandler(!isChecked);
        setChecked(!isChecked);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.code.toLocaleLowerCase() === 'enter') {
          rememberMeHandler(!isChecked);
          setChecked(!isChecked);
        }
      }}
    >
      <div
        className={isChecked ? `${styles.checkbox} ${styles.checked}` : `${styles.checkbox}`}
      >
        <div
          className={isChecked ? `${styles.tick} ${styles.visible}` : `${styles.tick}`}
        >
          ✓
        </div>
      </div>
      <SectionLabel>
        Remember Me
      </SectionLabel>
    </div>
  );
};

export default RememberMe;
