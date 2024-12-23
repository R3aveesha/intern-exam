import express, { request, response } from 'express';
import { PORT, mongoDBUrl } from './Config.js';
import mongoose from 'mongoose';
import BookReview from './BookModel.js';
import Controller from './Controller.js'
import cors from 'cors'

const app = express();
app.use(express.json()); 

app.use(cors())


app.use('/api/bookreviews',Controller)



// Root route
app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome to Book Review web');
});

mongoose.connect(mongoDBUrl)
    .then(() => {
        console.log('App connected to the database...');
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });
