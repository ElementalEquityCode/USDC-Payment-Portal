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
      amountEntered: '',
      isFormComplete: false
    };
  }

  handleAmountEnteredChanged = (value) => {
    this.setState({
      amountEntered: value
    }, () => {
      this.checkIfFormIsComplete();
    });
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

  checkIfFormIsComplete = () => {
    const { name } = this.state;
    const { email } = this.state;
    const { amountEntered } = this.state;

    if (name.trim() !== '' && validator.validate(email.trim()) && amountEntered !== '') {
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
    const { key } = this.state;
    const { keyId } = key;
    const { publicKey } = key;

    const payload = {
      idempotencyKey: UUID(),
      keyId,
      encryptedData: '',
      billingDetails: {
        name: 'Daniel Valencia',
        city: 'Doral',
        country: 'US',
        line1: '11133 NW 71st Ter',
        district: 'FL',
        postalCode: '33178'
      },
      expMonth: 12,
      expYear: 2022,
      metaData: {
        email: 'valencia.0.daniel@gmail.com',
        sessionId: UUID(),
        ipAddress: '244.28.239.130'
      }
    };

    const cardDetails = {
      number: '4007400000000007',
      cvv: '123'
    };

    payload.encryptedData = await this.encryptCardData(cardDetails, publicKey, keyId);

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
        encryptedData: btoa(cipherText.data),
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
              placeholder="1234 1234 1234 1234"
            />
            <TextField
              placeholder="MM/YY"
            />
            <TextField
              placeholder="CVC"
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
