import React from 'react';
import axios from 'axios';
import { v4 as UUID } from 'uuid';
import AmountToPayForm from '../AmountToPayForm/AmountToPayForm';
import ValuesContext from '../../Contexts/ValuesContext';
import TodaysDate from '../TodaysDate/TodaysDate';
import SectionLabel from '../SectionLabel/SectionLabel';
import TextField from '../TextField/TextField';
import Grid from '../Grid/Grid';
import styles from './PaymentForm.module.css';

const openPGP = require('openpgp');
const validator = require('email-validator');

class PaymentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      key: {
        keyId: '',
        publicKey: ''
      },
      name: '',
      email: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: ',',
      amountEntered: '',
      isFormComplete: false
    };
  }

  handleEmailChanged = (event) => {
    this.setState({
      email: event.target.value
    }, () => {
      this.checkIfFormIsComplete();
    });
  }

  handleNameChanged = (event) => {
    this.setState({
      name: event.target.value
    }, () => {
      this.checkIfFormIsComplete();
    });
  }

  handleCardNumberChanged = (event) => {
    this.setState({
      cardNumber: event.target.value
    }, () => {
      this.checkIfFormIsComplete();
    });
  }

  handleCardExpiryChanged = (event) => {
    this.setState({
      cardExpiry: event.target.value
    }, () => {
      this.checkIfFormIsComplete();
    });
  }

  handleCardCVVChanged = (event) => {
    this.setState({
      cardCVV: event.target.value
    }, () => {
      this.checkIfFormIsComplete();
    });
  }

  handleAmountEnteredChanged = (value) => {
    this.setState({
      amountEntered: value
    }, () => {
      this.checkIfFormIsComplete();
    });
  }

  checkIfFormIsComplete = () => {
    const { name } = this.state;
    const { email } = this.state;

    const { cardNumber } = this.state;
    const { cardExpiry } = this.state;
    const { cardCVV } = this.state;

    const { amountEntered } = this.state;

    if (name.trim() !== '' && validator.validate(email.trim()) && amountEntered !== '' && cardNumber.trim().length === 16 && cardExpiry.trim().length === 7 && cardCVV.trim().length === 3) {
      this.setState({
        isFormComplete: true
      });
    } else {
      this.setState({
        isFormComplete: false
      });
    }
  }

  formCompletionHandler = () => {
    const { isFormComplete } = this.state;

    if (isFormComplete) {
      this.createCard();
    }
  }

  createCard = async () => {
    const { name } = this.state;
    const { email } = this.state;

    const { cardNumber } = this.state;
    const { cardExpiry } = this.state;
    const { cardCVV } = this.state;

    const [cardExpiryMonth, cardExpiryYear] = cardExpiry.split('/');

    const { amountEntered } = this.state;

    const { key } = this.state;
    const { keyId } = key;
    const { publicKey } = key;

    const payload = {
      idempotencyKey: UUID(),
      keyId,
      encryptedData: '',
      billingDetails: {
        name,
        city: 'Doral',
        country: 'US',
        line1: '11133 NW 71st Ter',
        district: 'FL',
        postalCode: '33178'
      },
      expMonth: parseInt(cardExpiryMonth, 10),
      expYear: parseInt(cardExpiryYear, 10),
      metadata: {
        email,
        sessionId: UUID(),
        ipAddress: '172.33.222.1'
      },
      encryptedCVV: '',
      amount: amountEntered
    };

    const cardDetails = {
      number: cardNumber,
      cvv: cardCVV
    };

    const data = await this.encryptCardData(cardDetails, publicKey, keyId);
    const encryptedCVV = await this.encryptCVV(cardDetails.cvv, publicKey, keyId);

    payload.encryptedData = data.encryptedData;
    payload.encryptedCVV = encryptedCVV.encryptedData;

    const requestOptions = {
      data: {
        payload
      }
    };

    axios.post('/create-card-payment', requestOptions).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  encryptCardData = async (cardDetails, key, keyId) => {
    const decodedPublicKey = atob(key);
    const options = {
      message: await openPGP.createMessage({ text: JSON.stringify(cardDetails) }),
      encryptionKeys: await openPGP.readKey({ armoredKey: decodedPublicKey })
    };

    return openPGP.encrypt(options).then((cipherText) => (
      {
        encryptedData: btoa(cipherText),
        keyId
      }
    ));
  }

  encryptCVV = async (CVV, key, keyId) => {
    const decodedPublicKey = atob(key);
    const options = {
      message: await openPGP.createMessage({ text: JSON.stringify(CVV) }),
      encryptionKeys: await openPGP.readKey({ armoredKey: decodedPublicKey })
    };

    return openPGP.encrypt(options).then((cipherText) => (
      {
        encryptedData: btoa(cipherText),
        keyId
      }
    ));
  }

  componentDidMount = () => {
    axios.get('/key').then((response) => {
      this.setState({
        key: response.data
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { isFormComplete } = this.state;
    const { amountEntered } = this.state;
    const { name } = this.state;

    return (
      <div
        className={styles.overallGrid}
      >
        <div className={styles.paymentForm}>
          <TodaysDate />
          <Grid
            columns="one"
          >
            <SectionLabel
              type="dark"
            >
              Client Information
            </SectionLabel>
            <TextField
              type="name"
              placeholder="Name"
              onChangeEvent={this.handleNameChanged}
            />
            <TextField
              type="email"
              placeholder="Email"
              onChangeEvent={this.handleEmailChanged}
            />
          </Grid>
          <Grid
            columns="one"
          >
            <SectionLabel
              type="dark"
            >
              Card Information
            </SectionLabel>
            <TextField
              type="cardNumber"
              placeholder="1234 1234 1234 1234"
              onChangeEvent={this.handleCardNumberChanged}
            />
            <TextField
              type="cardExpiry"
              placeholder="MM/YY"
              onChangeEvent={this.handleCardExpiryChanged}
            />
            <TextField
              type="cardCVV"
              placeholder="CVV"
              onChangeEvent={this.handleCardCVVChanged}
            />
          </Grid>
        </div>
        <div className={styles.amountToPayForm}>
          <ValuesContext.Provider value={{
            name,
            handleAmountEnteredChanged: this.handleAmountEnteredChanged,
            amountEntered,
            isFormComplete,
            formCompletionHandler: this.formCompletionHandler
          }}
          >
            <AmountToPayForm />
          </ValuesContext.Provider>
        </div>
      </div>
    );
  }
}

export default PaymentForm;
