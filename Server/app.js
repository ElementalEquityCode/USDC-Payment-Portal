const express = require('express');
const app = express();
const appRouter = require('./Routes/AppRoute');

app.use(appRouter);

app.listen(8080, () => {
    console.log('Now listening on port 8080');
});