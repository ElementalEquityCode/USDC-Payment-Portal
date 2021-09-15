import React from 'react';
import styles from './ExclamationError.module.css';

class ExclamationError extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
    this.state = {
    };
  }

  componentDidMount() {
    if (this.ref.current) {
      setTimeout(() => {
        this.ref.current.classList.add(`${styles.visible}`);
      }, 0);
    }
  }

  render() {
    return (
      <div
        className={`${styles.exclamationErrorContainer}`}
        ref={this.ref}
      >
        <span className={styles.exclamationError}>!</span>
      </div>
    );
  }
}

export default ExclamationError;
