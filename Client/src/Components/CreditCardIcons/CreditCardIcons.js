import React from 'react';
import PropTypes from 'prop-types';
import CreditCardIconsContainer from './CreditCardIconsContainer/CreditCardIconsContainer';
import CardIcon from './CardIcon/CardIcon';
import Visa from '../../Assets/visa-icon.svg';
import MasterCard from '../../Assets/mastercard-icon.svg';

const creditCardType = require('credit-card-type');

class CreditCardIcons extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  renderCardIcon = (cardNumber) => {
    const cardInfo = creditCardType(cardNumber);
    let card = null;
    let icon = null;

    if (!cardNumber) {
      return null;
    }

    if (cardInfo.length !== 0) {
      if (cardInfo[0].niceType) {
        card = cardInfo[0].niceType;
      }
    }

    if (card === 'Visa') {
      icon = <CardIcon logo={Visa} />;
    } else if (card === 'Mastercard') {
      icon = <CardIcon logo={MasterCard} />;
    }

    return icon;
  }

  render() {
    const { shouldDisplay } = this.props;
    const { cardNumber } = this.props;
    const cardIcon = this.renderCardIcon(cardNumber);

    if (shouldDisplay) {
      if (cardIcon === null || cardIcon === 'null') {
        return <CreditCardIconsContainer />;
      }
    }
    return cardIcon;
  }
}

CreditCardIcons.propTypes = {
  shouldDisplay: PropTypes.bool,
  cardNumber: PropTypes.string
};

export default CreditCardIcons;
