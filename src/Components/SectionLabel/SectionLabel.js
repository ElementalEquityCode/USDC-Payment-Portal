import React from 'react';
import PropTypes from 'prop-types';
import styles from './SectionLabel.module.css';

const SectionLabel = (props) => {
  const { children } = props;

  return (
    <p className={styles.sectionLabel}>{children}</p>
  );
};

SectionLabel.propTypes = {
  children: PropTypes.string
};

export default SectionLabel;
