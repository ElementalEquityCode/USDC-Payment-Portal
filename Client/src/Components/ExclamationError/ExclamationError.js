import React from 'react';
import PropTypes from 'prop-types';
import styles from './ExclamationError.module.css';

class ExclamationError extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
    this.state = {
    };
  }

  componentDidUpdate() {
    const { shouldDisplay } = this.props;

    if (this.ref.current && shouldDisplay) {
      this.ref.current.classList.add(`${styles.visible}`);
    } else if (this.ref.current && !shouldDisplay) {
      this.ref.current.classList.remove(`${styles.visible}`);
    }
  }

  render() {
    const { labelType } = this.props;

    let positionClassNames = '';

    if (labelType === 'TextField') {
      positionClassNames = `${styles.exclamationErrorContainer} ${styles.forTextField}`;
    } else {
      positionClassNames = `${styles.exclamationErrorContainer} ${styles.forAmountToPayTextField}`;
    }

    return (
      <div
        className={positionClassNames}
        ref={this.ref}
      >
        <span className={styles.exclamationError}>!</span>
      </div>
    );
  }
}

ExclamationError.propTypes = {
  labelType: PropTypes.string,
  shouldDisplay: PropTypes.bool.isRequired
};

export default ExclamationError;
