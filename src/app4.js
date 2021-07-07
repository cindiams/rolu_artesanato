
const jwt = require('jsonwebtoken');
const secretAccessKey = process.env.secretAccessKey || 'SecretAccessKey';
import express from 'express';
import cors from 'cors';

const app4 = express();
app4.use(express.json());
app4.use(cors());

app4.get('/verify-access-token', (req, res) => {
    const accessToken = req.headers['access-token'];
    try {
        jwt.verify(accessToken, secretAccessKey);
        return res.status(200).send({ message: 'Access token is verified' });
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized access' });
    }
});


module.exports = app4;