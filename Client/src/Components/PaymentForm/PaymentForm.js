import React from 'react';
import axios from 'axios';
import { v4 as UUID } from 'uuid';
import AmountToPayForm from '../AmountToPayForm/AmountToPayForm';
import ValuesContext from '../../Contexts/ValuesContext';
import Grid from '../Grid/Grid';
import TodaysDate from '../TodaysDate/TodaysDate';
import SectionLabel from '../SectionLabel/SectionLabel';
import RequiredLabel from '../RequiredLabel/RequiredLabel';
import TextField from '../TextField/TextField';
import APIErrorModal from '../APIErrorModal/APIErrorModal';
import styles from './PaymentForm.module.css';

const openPGP = require('openpgp');
const validator = require('email-validator');

class PaymentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      key: {
        keyId: '',
        publicKey: '',
        isInErrorState: false
      },
      name: {
        value: '',
        isInErrorState: false
      },
      email: {
        value: '',
        isInErrorState: false
      },
      cardNumber: {
        value: '',
        isInErrorState: false
      },
      cardExpiry: {
        value: '',
        isInErrorState: false
      },
      cardCVV: {
        value: '',
        isInErrorState: false
      },
      amountEntered: {
        value: '',
        isInErrorState: false
      },
      isFormComplete: false
    };
  }

  handleNameChanged = (event) => {
    if (event) {
      this.setState({
        name: {
          value: event.target.value.trim(),
          isInErrorState: false
        }
      }, () => {
        this.checkIfFormIsComplete();
      });
    } else {
      const { name } = this.state;

      this.setState({
        name: {
          value: name.value,
          isInErrorState: name.value.trim().length === 0
        }
      });
    }
  }

  handleEmailChanged = (event) => {
    if (event) {
      this.setState({
        email: {
          value: event.target.value.trim(),
          isInErrorState: false
        }
      }, () => {
        this.checkIfFormIsComplete();
      });
    } else {
      const { email } = this.state;

      this.setState({
        email: {
          value: email.value,
          isInErrorState: !validator.validate(email.value.trim())
        }
      });
    }
  }

  handleCardNumberChanged = (event) => {
    if (event) {
      this.setState({
        cardNumber: {
          value: event.target.value.trim(),
          isInErrorState: false
        }
      }, () => {
        this.checkIfFormIsComplete();
      });
    } else {
      const { cardNumber } = this.state;

      this.setState({
        cardNumber: {
          value: cardNumber.value,
          isInErrorState: cardNumber.value.length !== 16
        }
      });
    }
  }

  handleCardExpiryChanged = (event) => {
    if (event) {
      this.setState({
        cardExpiry: {
          value: event.target.value.trim(),
          isInErrorState: false
        }
      }, () => {
        this.checkIfFormIsComplete();
      });
    } else {
      const { cardExpiry } = this.state;

      this.setState({
        cardExpiry: {
          value: cardExpiry.value,
          isInErrorState: cardExpiry.value.length !== 7
        }
      });
    }
  }

  handleCardCVVChanged = (event) => {
    if (event) {
      this.setState({
        cardCVV: {
          value: event.target.value.trim(),
          isInErrorState: false
        }
      }, () => {
        this.checkIfFormIsComplete();
      });
    } else {
      const { cardCVV } = this.state;

      this.setState({
        cardCVV: {
          value: cardCVV.value,
          isInErrorState: cardCVV.value.length !== 3
        }
      });
    }
  }

  handleAmountEnteredChanged = (value) => {
    if (value) {
      this.setState({
        amountEntered: {
          value,
          isInErrorState: false
        }
      }, () => {
        this.checkIfFormIsComplete();
      });
    } else {
      const { amountEntered } = this.state;

      this.setState({
        amountEntered: {
          value: amountEntered.value,
          isInErrorState: !amountEntered.value.length > 0
        }
      });
    }
  }

  checkIfFormIsComplete = () => {
    const { name } = this.state;
    const { email } = this.state;

    const { cardNumber } = this.state;
    const { cardExpiry } = this.state;
    const { cardCVV } = this.state;

    const { amountEntered } = this.state;

    if (name.value.trim().length !== 0
      && validator.validate(email.value.trim())
      && cardNumber.value.trim().length === 16
      && cardExpiry.value.trim().length === 7
      && cardCVV.value.trim().length === 3
      && amountEntered.value.trim().length !== 0) {
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
    } else {
      const { name } = this.state;
      const { email } = this.state;
      const { cardNumber } = this.state;
      const { cardExpiry } = this.state;
      const { cardCVV } = this.state;
      const { amountEntered } = this.state;

      if (name.value.trim().length === 0) {
        this.setState({
          name: {
            value: '',
            isInErrorState: true
          }
        });

        if (!validator.validate(email.value.trim())) {
          this.setState({
            email: {
              value: email.value,
              isInErrorState: true
            }
          });

          if (cardNumber.value.length !== 16) {
            this.setState({
              cardNumber: {
                value: cardNumber.value,
                isInErrorState: true
              }
            });
          }

          if (cardExpiry.value.length !== 7) {
            this.setState({
              cardExpiry: {
                value: cardExpiry.value,
                isInErrorState: true
              }
            });
          }

          if (cardCVV.value.length !== 3) {
            this.setState({
              cardCVV: {
                value: cardCVV.value,
                isInErrorState: true
              }
            });
          }

          if (amountEntered.value.length === 0) {
            this.setState({
              amountEntered: {
                value: amountEntered.value,
                isInErrorState: true
              }
            });
          }
        }
      }
    }
  }

  createCard = async () => {
    const { name } = this.state;
    const { email } = this.state;

    const { cardNumber } = this.state;
    const { cardExpiry } = this.state;
    const { cardCVV } = this.state;

    const [cardExpiryMonth, cardExpiryYear] = cardExpiry.value.split('/');

    const { amountEntered } = this.state;

    const { key } = this.state;
    const { keyId } = key;
    const { publicKey } = key;

    const payload = {
      idempotencyKey: UUID(),
      keyId,
      encryptedData: '',
      billingDetails: {
        name: name.value,
        city: 'Doral',
        country: 'US',
        line1: '11133 NW 71st Ter',
        district: 'FL',
        postalCode: '33178'
      },
      expMonth: parseInt(cardExpiryMonth, 10),
      expYear: parseInt(cardExpiryYear, 10),
      metadata: {
        email: email.value,
        sessionId: UUID(),
        ipAddress: '172.33.222.1'
      },
      encryptedCVV: '',
      amount: amountEntered.value
    };

    const cardDetails = {
      number: cardNumber.value,
      cvv: cardCVV.value
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
        key: {
          keyId: response.data.keyId,
          publicKey: response.data.publicKey,
          isInErrorState: false
        }
      });
    }).catch(() => {
      this.setState({
        key: {
          keyId: '',
          publicKey: '',
          isInErrorState: true
        }
      });
    });
  }

  render() {
    const { isFormComplete } = this.state;
    const { key } = this.state;

    const { name } = this.state;
    const { email } = this.state;

    const { cardNumber } = this.state;
    const { cardExpiry } = this.state;
    const { cardCVV } = this.state;

    const { amountEntered } = this.state;

    return (
      <>
        <APIErrorModal
          shouldDisplay={key.isInErrorState}
        >
          Error retrieving public key. Transactions will not process - refresh page
        </APIErrorModal>
        <div
          className={styles.overallGrid}
        >
          <div className={styles.paymentForm}>
            <TodaysDate />
            <Grid
              columns="one"
            >
              <Grid
                columns="two"
              >
                <SectionLabel
                  type="dark"
                >
                  Client Information
                </SectionLabel>
                <RequiredLabel shouldDisplay={name.isInErrorState || email.isInErrorState} />
              </Grid>
              <TextField
                type="name"
                placeholder="Name"
                onChangeEvent={this.handleNameChanged}
                shouldDisplayError={name.isInErrorState}
              />
              <TextField
                type="email"
                placeholder="Email"
                onChangeEvent={this.handleEmailChanged}
                shouldDisplayError={email.isInErrorState}
              />
            </Grid>
            <Grid
              columns="one"
            >
              <Grid
                columns="two"
              >
                <SectionLabel
                  type="dark"
                >
                  Card Information
                </SectionLabel>
                <RequiredLabel
                  shouldDisplay={
                      cardNumber.isInErrorState
                      || cardExpiry.isInErrorState
                      || cardCVV.isInErrorState
                  }
                />
              </Grid>
              <TextField
                type="cardNumber"
                placeholder="1234 1234 1234 1234"
                onChangeEvent={this.handleCardNumberChanged}
                shouldDisplayError={cardNumber.isInErrorState}
              />
              <TextField
                type="cardExpiry"
                placeholder="MM/YYYY"
                onChangeEvent={this.handleCardExpiryChanged}
                shouldDisplayError={cardExpiry.isInErrorState}
              />
              <TextField
                type="cardCVV"
                placeholder="CVV"
                onChangeEvent={this.handleCardCVVChanged}
                shouldDisplayError={cardCVV.isInErrorState}
              />
            </Grid>
          </div>
          <div className={styles.amountToPayForm}>
            <ValuesContext.Provider value={{
              name: name.value,
              handleAmountEnteredChanged: this.handleAmountEnteredChanged,
              amountEntered: amountEntered.value,
              isFormComplete,
              shouldDisplayAmountEnteredError: amountEntered.isInErrorState,
              formCompletionHandler: this.formCompletionHandler
            }}
            >
              <AmountToPayForm />
            </ValuesContext.Provider>
          </div>
        </div>
      </>
    );
  }
}

export default PaymentForm;
