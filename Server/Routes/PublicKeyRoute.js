const express = require('express');
const keyRouter = express.Router();

let publicKey = '';

const axios = require('axios');

const getPublicKey = () => {
  console.log('Retrieving public key.');
  const url = 'https://api-sandbox.circle.com/v1/encryption/public';

  const headers = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer QVBJX0tFWTpiY2E4YWNkM2VkYjExZWUwMDEyZWViM2Y3Nzg4NWRmNDozZjczYmE4NWIxNmU4N2RjMTI2MTEzOThjYjBkYmU0Nw'
    }
  };

  axios.get(url, headers).then((response) => {
    console.log('Fetched public key.');
      publicKey = response.data.data;
  }).catch((error) => {
    console.log(error);
  });
};

getPublicKey();

keyRouter.get('/key', (req, res) => {
    res.send(publicKey);
});

module.exports = keyRouter;
