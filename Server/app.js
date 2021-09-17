const express = require('express');
const app = express();
const appRouter = require('./Routes/AppRoute');
const publicKeyRouter = require('./Routes/PublicKeyRoute');
const createPaymentRoute = require('./Routes/CreatePaymentRoute');

app.use(publicKeyRouter);
app.use(createPaymentRoute);
app.use(appRouter);

app.listen(8080, () => {
    console.log('Now listening on port 8080');
});