import React from 'react';
import styles from './UIModeSwitch.module.css';

class UIModeSwitch extends React.Component {
  constructor() {
    super();

    this.state = {
      mode: 'light'
    };
  }

  handleUIModeSwitched = () => {
    const { mode } = this.state;

    this.setState({
      mode: mode === 'light' ? 'dark' : 'light'
    });
  }

  render() {
    const { mode } = this.state;

    return (
      <div
        className={styles.uiModeSwitchContainer}
      >
        <div
          role="button"
          className={mode === 'light' ? `${styles.uiModeSwitch}` : `${styles.uiModeSwitch} ${styles.darkUIModeSwitch}`}
          onClick={this.handleUIModeSwitched}
          onKeyDown={this.handleUIModeSwitched}
          tabIndex={0}
        >
          <div
            className={mode === 'light' ? `${styles.switchContainer}` : `${styles.switchContainer} ${styles.darkSwitchContainer}`}
          >
            <div
              className={styles.switch}
            >
            </div>
          </div>
        </div>
        <span
          className={mode === 'light' ? `${styles.modeLabel}` : `${styles.modeLabel} ${styles.modeLabelDark}`}
        >
          {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
        </span>
      </div>
    );
  }
}

export default UIModeSwitch;
