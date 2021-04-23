const express = require('express');

const router = express.Router();

const Movie = require('../models/Movie.model.js');

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(allMoviesFromDB => {
            console.log('Retrieved from DB: ', allMoviesFromDB);
            res.render('movies', {movies: allMoviesFromDB})
        })
        .catch(err => {
            console.log('Error while getting movies from DB: ', err);    
            next(err);
        })
});

// router.get('/movies/:movieId')

module.exports = router;