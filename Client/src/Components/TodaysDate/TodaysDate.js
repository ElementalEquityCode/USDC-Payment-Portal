import React from 'react';
import styles from './TodaysDate.module.css';

const TodaysDate = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <h1
      className={styles.todaysDate}
    >
      {`${months[month]}, ${day} ${year}`}
    </h1>
  );
};

export default TodaysDate;
