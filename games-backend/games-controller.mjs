// Controllers for the Movie Collection

import 'dotenv/config';
import express from 'express';
import * as movies from './movies-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/movies', (req,res) => { 
    movies.createMovie(
        req.body.title, 
        req.body.year, 
        req.body.language
        )
        .then(movie => {
            res.status(201).json(movie);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Unique and specific error message.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/movies', (req, res) => {
    movies.retrieveMovies()
        .then(movie => { 
            if (movie !== null) {
                res.json(movie);
            } else {
                res.status(404).json({ Error: 'Unique and specific error message.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Unique and specific error message.' });
        });
});


// RETRIEVE by ID controller
app.get('/movies/:_id', (req, res) => {
    movies.retrieveMovieByID(req.params._id)
    .then(movie => { 
        if (movie !== null) {
            res.json(movie);
        } else {
            res.status(404).json({ Error: 'Unique and specific error message.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Unique and specific error message.' });
    });

});


// UPDATE controller ************************************
app.put('/movies/:_id', (req, res) => {
    movies.updateMovie(
        req.params._id, 
        req.body.title, 
        req.body.year, 
        req.body.language
    )
    .then(movie => {
        res.json(movie);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error: 'Unique and specific error message.' });
    });
});


// DELETE Controller ******************************
app.delete('/movies/:_id', (req, res) => {
    movies.deleteMovieById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send({ Success: 'Delete was successful Unique and specific error message.' });
            } else {
                res.status(404).json({ Error: 'Unique and specific error message.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Unique and specific error message.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});