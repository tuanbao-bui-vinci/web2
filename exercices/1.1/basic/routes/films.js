var express = require('express');
var router = express.Router();

const FILM = [
    {
      id: 1,
      title: 'Harry Potter et la chambres des secrets',
      duration: 130,
      budget: 300,
      link: 'imdb'
    },
    {
      id: 2,
      title: 'Hobbit',
      duration: 130,
      budget: 200,
      link: 'imdb'
    },
    {
      id: 3,
      title: 'Avengers: Endgame',
      duration: 140,
      budget: 400,
      link: 'imdb'
    },
  ];
  
  // Read all the pizzas from the menu
  router.get('/', (req, res, next) => {
    console.log('GET /films');
    res.json(FILM);
  });

module.exports = router;