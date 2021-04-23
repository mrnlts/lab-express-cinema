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

router.get('/movies/:movieId', (req, res, next) => {
    const { movieId } = req.params;
    console.log(movieId);
    Movie.findOne({"_id": movieId})
        .then(theMovie => {
            console.log('Retrieved movie from DB: ', { movie: theMovie });
            res.render('movie-details', { movie: theMovie });
        })
        .catch(err => {
            console.log('Error while retrieving movie details: ', err);
            next(err);
        });
})

module.exports = router;