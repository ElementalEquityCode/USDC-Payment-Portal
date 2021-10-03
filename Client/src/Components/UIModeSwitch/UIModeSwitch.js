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
    if (!localStorage.getItem('color-scheme')) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setState({
          mode: 'dark'
        }, () => {
          document.documentElement.setAttribute('data-theme', 'dark');
        });
      } else {
        this.setState({
          mode: 'light'
        }, () => {
          document.documentElement.setAttribute('data-theme', 'light');
        });
      }

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        this.setState({
          mode: event.matches ? 'dark' : 'light'
        }, () => {
          document.documentElement.setAttribute('data-theme', event.matches ? 'dark' : 'light');
        });
      });
    } else {
      this.setState({
        mode: localStorage.getItem('color-scheme')
      }, () => {
        document.documentElement.setAttribute('data-theme', localStorage.getItem('color-scheme'));
      });
    }
  }

  handleUIModeSwitched = () => {
    const { mode } = this.state;

    this.setState({
      mode: mode === 'dark' ? 'light' : 'dark'
    }, () => {
      localStorage.setItem('color-scheme', mode === 'dark' ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', mode === 'dark' ? 'light' : 'dark');
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
