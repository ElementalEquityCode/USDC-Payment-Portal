import React from 'react';
import ValueEnteredLabel from '../ValueEnteredLabel/ValueEnteredLabel';
import NumberPadButtonGrid from '../NumberPadButtonGrid/NumberPadButtonGrid';
import NumberPadButton from '../NumberPadButton/NumberPadButton';

class PaymentForm extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <ValueEnteredLabel />
        <NumberPadButtonGrid>
          <NumberPadButton>1</NumberPadButton>
        </NumberPadButtonGrid>
      </div>
    );
  }
}

export default PaymentForm;
