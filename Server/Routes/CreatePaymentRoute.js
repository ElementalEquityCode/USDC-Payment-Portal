const express = require('express');
const createPaymentRouter = express.Router();
const axios = require('axios');
const { request } = require('express');

createPaymentRouter.use(express.json({ type:'application/json' }));

createPaymentRouter.post('/create-card-payment', (req, res) => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer QVBJX0tFWTpiY2E4YWNkM2VkYjExZWUwMDEyZWViM2Y3Nzg4NWRmNDozZjczYmE4NWIxNmU4N2RjMTI2MTEzOThjYjBkYmU0Nw'
    }
  };

  axios.post('https://api-sandbox.circle.com/v1/cards', req.body.data.payload, requestOptions).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  })
});

module.exports = createPaymentRouter;