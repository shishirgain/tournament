const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = require('./db');
connection.sync();
connection.authenticate().then(() => {
    console.log('Connection has been extablished successfully.');
}).catch(() => {
    console.log('Unable to connect to the database.');
});

app.use('/~file/upload', express.static('./temp/uploads'));

// RestAPI endpoind
app.use('/api/v/1.0.0/', require('./api'));

// serving front-end build files
app.use(history());
app.use('/', express.static('./dist'));

app.all('*', (req, res, next) => {
    res.sendFile('index.html');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Port on listening http://localhost:${PORT}`);
})