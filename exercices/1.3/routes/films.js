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
      duration: 120,
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
  

  router.get('/', (req, res) => {
    const minFilmDuration = req?.query ? parseInt(req.query['minimum-duration']) 
    : undefined;

    if( typeof minFilmDuration !=='number' || minFilmDuration<=0 )
    return res.json('wrong min duration');

    if(!minFilmDuration) return res.json(FILM);

    const filmsReachingMinimumDuration = FILM.filter((film)=> film.duration >= minFilmDuration);
    
    return res.json(filmsReachingMinimumDuration);
  });

  router.get('/:id',(req,res)=>{
    
  });



module.exports = router;