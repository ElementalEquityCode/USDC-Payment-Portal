import React from 'react';
import PropTypes from 'prop-types';
import styles from './Grid.module.css';

const Grid = (props) => {
  const { children } = props;
  const { columns } = props;

  if (columns === 'two') {
    return (
      <div className={`${styles.grid} ${styles.two}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${styles.one}`}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  columns: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default Grid;
