const express = require('express');
const createPaymentRouter = express.Router();
const axios = require('axios');
const { request } = require('express');
const { v4: UUID } = require('uuid');

createPaymentRouter.use(express.json({ type:'application/json' }));

createPaymentRouter.post('/create-card-payment', (req, res) => {
  const amount = req.body.data.payload.amount
  const encryptedCVV = req.body.data.payload.encryptedCVV;

  delete req.body.data.payload['encryptedCVV'];
  delete req.body.data.payload['amount'];

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer QVBJX0tFWTpiY2E4YWNkM2VkYjExZWUwMDEyZWViM2Y3Nzg4NWRmNDozZjczYmE4NWIxNmU4N2RjMTI2MTEzOThjYjBkYmU0Nw'
    }
  };

  axios.post('https://api-sandbox.circle.com/v1/cards', req.body.data.payload, requestOptions).then((response) => {
      const data = {
        autoCapture: true,
        idempotencyKey: UUID(),
        encryptedData: encryptedCVV,
        keyId: req.body.data.payload.keyId,
        description: 'Payment Portal Payment',
        amount: {
          amount,
          currency: 'USD'
        },
        verification: 'cvv',
        source: {
          id: response.data.data.id,
          type: 'card'
        },
        metadata: {
          email: req.body.data.payload.metadata.email,
          sessionId: req.body.data.payload.metadata.sessionId,
          ipAddress: req.body.data.payload.metadata.ipAddress
        }
      };

      axios.post('https://api-sandbox.circle.com/v1/payments', data, requestOptions).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(`Payment error - ${error}`);
      });
  }).catch((error) => {
    console.log(`Card error - ${error}`);
  });
});

module.exports = createPaymentRouter;