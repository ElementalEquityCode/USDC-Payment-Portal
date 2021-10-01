import React from 'react';
import PropTypes from 'prop-types';
import styles from './SectionLabel.module.css';

const SectionLabel = (props) => {
  const { children } = props;
  const { type } = props;

  return (
    <p
      className={`${styles.sectionLabel} ${type === 'light' ? `${styles.light}` : `${styles.dark}`}`}
    >
      {children}
    </p>
  );
};

SectionLabel.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string
};

export default SectionLabel;
