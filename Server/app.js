const express = require('express');
const app = express();
const appRouter = require('./Routes/AppRoute');
const publicKeyRouter = require('./Routes/PublicKeyRoute');
const createPaymentRoute = require('./Routes/CreatePaymentRoute');
const port = process.env.PORT || 8080;

app.use(publicKeyRouter);
app.use(createPaymentRoute);
app.use(appRouter);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});