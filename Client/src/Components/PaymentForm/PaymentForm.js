import React from 'react';
import { v4 as UUID } from 'uuid';
import { productionInstance as axios } from '../../Axios/Axios';
import APIErrorModal from '../APIErrorModal/APIErrorModal';
import AmountToPayForm from '../AmountToPayForm/AmountToPayForm';
import ValuesContext from '../../Contexts/ValuesContext';
import Grid from '../Grid/Grid';
import TodaysDate from '../TodaysDate/TodaysDate';
import SectionLabel from '../SectionLabel/SectionLabel';
import RequiredLabel from '../RequiredLabel/RequiredLabel';
import TextField from '../TextField/TextField';
import PaymentConfirmationPage from '../PaymentConfirmationPage/PaymentConfirmationPage';
import styles from './PaymentForm.module.css';

const openPGP = require('openpgp');
const validator = require('email-validator');

class PaymentForm extends React.Component {
  constructor() {
    super();

    this.paymentFormRef = React.createRef();
    this.amountToPayFormRef = React.createRef();

    this.state = {
      key: {
        keyId: '',
        publicKey: '',
        isInErrorState: false
      },
      apiError: {
        message: ''
      },
      firstName: {
        value: '',
        isInErrorState: false
      },
      lastName: {
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
      isFormComplete: false,
      isPaymentProcessing: false,
      confirmationPage: {
        amountPaid: '',
        confirmationCode: '',
        paymentDate: '',
        paymentMethod: ''
      }
    };
  }

  handleFirstNameChanged = (event) => {
    if (event) {
      this.setState({
        firstName: {
          value: event.target.value.trim(),
          isInErrorState: false
        }
      }, () => {
        this.checkIfFormIsComplete();
      });
    } else {
      const { firstName } = this.state;

      this.setState({
        firstName: {
          value: firstName.value,
          isInErrorState: firstName.value.trim().length === 0
        }
      });
    }
  }

  handleLastNameChanged = (event) => {
    if (event) {
      this.setState({
        lastName: {
          value: event.target.value.trim(),
          isInErrorState: false
        }
      }, () => {
        this.checkIfFormIsComplete();
      });
    } else {
      const { lastName } = this.state;

      this.setState({
        lastName: {
          value: lastName.value,
          isInErrorState: lastName.value.trim().length === 0
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
          isInErrorState: cardNumber.value.length !== 19
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
    if (!value.wasBlured) {
      this.setState({
        amountEntered: {
          value: value.value,
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
          isInErrorState: !(amountEntered.value.length !== 0)
        }
      });
    }
  }

  checkIfFormIsComplete = () => {
    const { firstName } = this.state;
    const { lastName } = this.state;

    const { email } = this.state;

    const { cardNumber } = this.state;
    const { cardExpiry } = this.state;
    const { cardCVV } = this.state;

    const { amountEntered } = this.state;

    if (firstName.value.trim().length !== 0
      && lastName.value.trim().length !== 0
      && validator.validate(email.value.trim())
      && cardNumber.value.trim().length === 19
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
    const { key } = this.state;
    const { isPaymentProcessing } = this.state;
    const { isFormComplete } = this.state;

    if (!isPaymentProcessing && isFormComplete && key.publicKey) {
      this.createCard();
    } else {
      const { firstName } = this.state;
      const { lastName } = this.state;
      const { email } = this.state;
      const { cardNumber } = this.state;
      const { cardExpiry } = this.state;
      const { cardCVV } = this.state;
      const { amountEntered } = this.state;

      if (firstName.value.trim().length === 0) {
        this.setState({
          firstName: {
            value: '',
            isInErrorState: true
          }
        });

        if (lastName.value.trim().length === 0) {
          this.setState({
            lastName: ({
              value: '',
              isInErrorState: true
            })
          });
        }

        if (!validator.validate(email.value.trim())) {
          this.setState({
            email: {
              value: email.value,
              isInErrorState: true
            }
          });

          if (cardNumber.value.length !== 19) {
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
    const { firstName } = this.state;
    const { lastName } = this.state;
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
        name: `${firstName.value} ${lastName.value}`,
        city: 'Doral',
        country: 'US',
        line1: '11133 NW 71st Ter',
        district: 'FL',
        postalCode: '33178'
      }, // Fix this
      expMonth: parseInt(cardExpiryMonth, 10),
      expYear: parseInt(cardExpiryYear, 10),
      metadata: {
        email: email.value,
        sessionId: UUID(),
        ipAddress: '172.33.222.1' // Fix this
      },
      encryptedCVV: '',
      amount: amountEntered.value
    };

    const cardDetails = {
      number: cardNumber.value.replace(/\s/g, ''),
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

    this.setState({
      isPaymentProcessing: true
    }, () => {
      axios.post('/create-card-payment', requestOptions)
        .then((response) => {
          if (response.data.status === 'pending') {
            this.pollEndpoint(response.data.id);
          } else if (response.data.status === 'confirmed' || response.data.status === 'success') {
            this.setState({
              isPaymentProcessing: false
            });
            console.log('confirmed from here'); // Fix this
          }
        })
        .catch(({ response }) => {
          this.setState({
            isPaymentProcessing: false,
            apiError: {
              message: response.data.message
            }
          });
        });
    });
  }

  pollEndpoint = (paymentEndpoint) => {
    axios.get(`/payment-status/${paymentEndpoint}`).then((response) => {
      if (response.data.status === undefined || response.data.status === '' || response.data.status === 'pending') {
        setTimeout(() => {
          this.pollEndpoint(paymentEndpoint);
        }, 2000);
      } else if (response.data.status === 'confirmed' || response.data.state === 'success') {
        this.performViewWillDisappearAnimation();

        setTimeout(() => {
          this.setState({
            isPaymentProcessing: false,
            confirmationPage: {
              amountPaid: response.data.amount,
              confirmationCode: response.data.id,
              paymentDate: response.data.date,
              paymentMethod: response.data.paymentMethod
            }
          });
        }, 1000);
      } else {
        let errorString = '';

        switch (response.data.status) {
          case 'payment_failed':
            errorString = 'Payment failed, try another card';
            break;
          case 'card_not_honored':
            errorString = 'Card not honored';
            break;
          case 'payment_not_supported_by_issuer':
            errorString = 'Payment not supported by issuer, try another card';
            break;
          case 'payment_not_funded':
            errorString = 'Insufficient funds, try another card';
            break;
          case 'card_invalid':
            errorString = 'Invalid card';
            break;
          case 'card_limit_violated':
            errorString = 'Card limit violated, try another card';
            break;
          case 'payment_denied':
            errorString = 'Payment denied';
            break;
          case 'payment_fraud_detected':
            errorString = 'Payment fraud detected';
            break;
          case 'credit_card_not_allowed':
            errorString = 'Card not honored';
            break;
          case 'Payment blocked by issuer':
            errorString = 'Card not honored';
            break;
          case 'card_account_ineligible':
            errorString = 'Card not eligible for this type of payment';
            break;
          default:
            errorString = 'An unknown error occured';
        }

        this.setState({
          isPaymentProcessing: false,
          apiError: {
            message: errorString
          }
        });
      }
    }).catch(({ paymentStatusError }) => {
      console.log(paymentStatusError);
    });
  };

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

    this.performViewDidAppearAnimation();
  }

  performViewDidAppearAnimation = () => {
    if (this.paymentFormRef.current) {
      setTimeout(() => {
        this.paymentFormRef.current.classList.add(`${styles.visible}`);
      }, 500);
    }

    if (this.amountToPayFormRef.current) {
      setTimeout(() => {
        this.amountToPayFormRef.current.classList.add(`${styles.visible}`);
      }, 1000);
    }
  }

  performViewWillDisappearAnimation = () => {
    if (this.paymentFormRef.current) {
      this.paymentFormRef.current.classList.remove(`${styles.visible}`);
    }
    if (this.amountToPayFormRef.current) {
      this.amountToPayFormRef.current.classList.remove(`${styles.visible}`);
    }
  }

  displayPaymentForm = () => {
    const { isFormComplete } = this.state;
    const { key } = this.state;
    const { apiError } = this.state;

    const { firstName } = this.state;
    const { lastName } = this.state;

    const { email } = this.state;

    const { cardNumber } = this.state;
    const { cardExpiry } = this.state;
    const { cardCVV } = this.state;

    const { amountEntered } = this.state;

    const { isPaymentProcessing } = this.state;

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
          <div
            className={styles.paymentForm}
            ref={this.paymentFormRef}
          >
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
                <RequiredLabel
                  shouldDisplay={firstName.isInErrorState
                  || lastName.isInErrorState
                  || email.isInErrorState}
                />
              </Grid>
              <TextField
                type="name"
                placeholder="First Name"
                onChangeEvent={this.handleFirstNameChanged}
                shouldDisplayError={firstName.isInErrorState}
              />
              <TextField
                type="name"
                placeholder="Last Name"
                onChangeEvent={this.handleLastNameChanged}
                shouldDisplayError={lastName.isInErrorState}
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
          <div
            className={styles.amountToPayForm}
            ref={this.amountToPayFormRef}
          >
            <ValuesContext.Provider value={{
              name: `${firstName.value} ${lastName.value}`,
              handleAmountEnteredChanged: this.handleAmountEnteredChanged,
              amountEntered: amountEntered.value,
              isFormComplete,
              shouldDisplayAmountEnteredError: amountEntered.isInErrorState,
              formCompletionHandler: this.formCompletionHandler,
              paymentErrorResponse: apiError.message,
              isPaymentProcessing
            }}
            >
              <AmountToPayForm />
            </ValuesContext.Provider>
          </div>
        </div>
      </>
    );
  }

  displayConfirmationPage = (amountPaid, confirmationCode, paymentDate, paymentMethod) => (
    <PaymentConfirmationPage
      amountPaid={amountPaid}
      confirmationCode={confirmationCode}
      paymentDate={paymentDate}
      paymentMethod={paymentMethod}
    />
  );

  render() {
    const { confirmationPage } = this.state;

    if (confirmationPage.confirmationCode) {
      return this.displayConfirmationPage(confirmationPage.amountPaid,
        confirmationPage.confirmationCode,
        confirmationPage.paymentDate,
        confirmationPage.paymentMethod);
    }
    return this.displayPaymentForm();
  }
}

export default PaymentForm;
