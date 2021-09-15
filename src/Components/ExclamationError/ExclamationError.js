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
    console.log(this.ref.current);
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
