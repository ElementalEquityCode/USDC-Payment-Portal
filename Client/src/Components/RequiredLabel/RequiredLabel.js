import React from 'react';
import PropTypes from 'prop-types';
import styles from './RequiredLabel.module.css';

const RequiredLabel = (props) => {
  const { shouldDisplay } = props;

  return (
    <p
      className={shouldDisplay ? `${styles.requiredLabel} ${styles.visible}` : `${styles.requiredLabel}`}
    >
      Required
    </p>
  );
};

RequiredLabel.propTypes = {
  shouldDisplay: PropTypes.bool.isRequired
};

export default RequiredLabel;
