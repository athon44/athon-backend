import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

export const athonApi = functions.https.onRequest(main);


app.post('/test', async (req, res) => {
    const doc = {
        name: req.body['name']
    };
    db.collection('test').doc('TEST').set(doc)
        .then(() => res.status(201).send('Success.'))
        .catch(error => res.status(400).send('Failure'));
});