import React from 'react';
import styles from './CreditCardIconsContainer.module.css';
import Visa from '../../../Assets/visa-icon.svg';
import MasterCard from '../../../Assets/mastercard-icon.svg';

class CreditCardIconsContainer extends React.Component {
  constructor() {
    super();
    this.interval = null;
    this.visaRef = React.createRef();
    this.mastercardRef = React.createRef();
  }

  componentDidMount() {
    let cardToShow = 0;

    this.interval = setInterval(() => {
      if (cardToShow === 0) {
        this.visaRef.current.classList.add(`${styles.visible}`);
        this.mastercardRef.current.classList.remove(`${styles.visible}`);

        cardToShow = 1;
      } else if (cardToShow === 1) {
        this.visaRef.current.classList.remove(`${styles.visible}`);
        this.mastercardRef.current.classList.add(`${styles.visible}`);
        cardToShow = 0;
      }
    }, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div
        className={`${styles.creditCardIconsContainer} ${styles.visibleComponent}`}
      >
        <img
          ref={this.visaRef}
          className={styles.creditCardIcon}
          src={Visa}
          alt=""
        />
        <img
          ref={this.mastercardRef}
          className={styles.creditCardIcon}
          src={MasterCard}
          alt=""
        />
      </div>
    );
  }
}

export default CreditCardIconsContainer;
