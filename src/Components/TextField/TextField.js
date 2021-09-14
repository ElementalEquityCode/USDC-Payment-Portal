import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextField.module.css';

class TextField extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false
    };
  }

  handleFocus = () => {
    this.setState({
      isFocused: true
    });
  }

  handleBlur = () => {
    this.setState({
      isFocused: false
    });
  }

  render() {
    const { isFocused } = this.state;
    const { placeholder } = this.props;

    return (
      <div className={isFocused ? `${styles.textFieldContainer} ${styles.focused}` : `${styles.textFieldContainer}`}>
        <input
          className={styles.textField}
          type="text"
          placeholder={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

TextField.propTypes = {
  placeholder: PropTypes.string
};

export default TextField;