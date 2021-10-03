import React from 'react';
import styles from './UIModeSwitch.module.css';

class UIModeSwitch extends React.Component {
  constructor() {
    super();

    this.state = {
      mode: ''
    };
  }

  componentDidMount() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setState({
        mode: 'dark'
      });
    } else {
      this.setState({
        mode: 'light'
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      this.setState({
        mode: event.matches ? 'dark' : 'light'
      });
    });
  }

  handleUIModeSwitched = () => {
    const { mode } = this.state;

    console.log(mode);
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
            className={mode === 'light' ? `${styles.switch}` : `${styles.switch} ${styles.darkSwitch}`}
          >
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
