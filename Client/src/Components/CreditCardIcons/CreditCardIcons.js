import React from 'react';
import PropTypes from 'prop-types';
import CreditCardIconsContainer from './CreditCardIconsContainer/CreditCardIconsContainer';
import CardIcon from './CardIcon/CardIcon';
import Visa from '../../Assets/visa-icon.svg';
import MasterCard from '../../Assets/mastercard-icon.svg';

class CreditCardIcons extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  renderCardIcon = (cardNumber) => {
    let icon = null;

    if (cardNumber[0] === '4') {
      icon = <CardIcon logo={Visa} />;
    } else if (cardNumber[0] === '5') {
      icon = <CardIcon logo={MasterCard} />;
    }

    return icon;
  }

  render() {
    const { shouldDisplay } = this.props;
    const { cardNumber } = this.props;

    const cardIcon = this.renderCardIcon(cardNumber);

    if (shouldDisplay) {
      if (cardIcon) {
        return cardIcon;
      }
      return <CreditCardIconsContainer shouldDisplay={shouldDisplay} />;
    }
    return null;
  }
}

CreditCardIcons.propTypes = {
  shouldDisplay: PropTypes.bool,
  cardNumber: PropTypes.string
};

export default CreditCardIcons;
