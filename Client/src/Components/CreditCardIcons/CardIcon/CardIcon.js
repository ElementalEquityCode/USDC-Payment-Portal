import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CardIcon.module.css';

const CardIcon = (props) => {
  const { logo } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.classList.add(`${styles.visible}`);
      }, 0);
    }
  });

  return (
    <img
      ref={ref}
      src={logo}
      className={styles.cardIcon}
      alt=""
    />
  );
};

CardIcon.propTypes = {
  logo: PropTypes.string
};

export default CardIcon;
