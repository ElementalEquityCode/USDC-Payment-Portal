import React, { useContext } from 'react';
import styles from './AmountToPayForm.module.css';
import ValuesContext from '../../Contexts/ValuesContext';
import Grid from '../Grid/Grid';
import AmountToPayTextField from '../AmountToPayTextField/AmountToPayTextField';
import SectionLabel from '../SectionLabel/SectionLabel';
import PaymentFromTo from '../PaymentFromTo/PaymentFromTo';
import GeneralActionButton from '../GeneralActionButton/GeneralActionButton';
import PaymentResponseError from '../PaymentResponseError/PaymentResponseError';

const AmountToPayForm = () => {
  const { paymentErrorResponse } = useContext(ValuesContext);

  return (
    <div className={styles.amountToPayForm}>
      <Grid>
        <Grid
          columns="two"
        >
          <SectionLabel
            type="dark"
          >
            Enter Amount to Pay
          </SectionLabel>
        </Grid>
        <AmountToPayTextField />
        <PaymentFromTo
          to="Ian Robinson"
        />
        <GeneralActionButton>
          Enter Amount to Pay
        </GeneralActionButton>
        <PaymentResponseError
          shouldDisplay={paymentErrorResponse}
        >
          {paymentErrorResponse}
        </PaymentResponseError>
      </Grid>
    </div>
  );
};

export default AmountToPayForm;
