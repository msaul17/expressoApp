const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const app = express();
const api = require('./api'); // ./ it will look in your project files; otherwise it will look in node modules only
app.use('/api', api);

app.use(bodyParser.json());
app.use(cors());

app.use(errorhandler());

app.listen(process.env.PORT || 4000, () => {
    console.log('Server.js is listening on port 4000!');
});

module.exports = app;