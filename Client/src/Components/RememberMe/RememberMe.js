import React, { useState } from 'react';
import styles from './RememberMe.module.css';
import SectionLabel from '../SectionLabel/SectionLabel';

const RememberMe = () => {
  const [isChecked, setChecked] = useState(false);

  console.log(isChecked);
  console.log(setChecked);

  return (
    <div
      className={styles.remembeMeContainer}
      onClick={() => {
        setChecked(!isChecked);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.code.toLocaleLowerCase() === 'enter') {
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
