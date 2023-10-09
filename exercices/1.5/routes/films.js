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
    return res.sendStatus(400);

    if(!minFilmDuration) return res.json(FILM);

    const filmsReachingMinimumDuration = FILM.filter((film)=> film.duration >= minFilmDuration);
    
    return res.json(filmsReachingMinimumDuration);
  });

  router.get('/:id',(req,res)=>{
    const indexOfFilm = FILM.findIndex((films)=>films.id == req.params.id);

    if(indexOfFilm<0) return res.sendStatus(404); 
    
    return res.json(FILM[indexOfFilm]);
  });

  router.post('/',(req, res) =>{
    const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
    const duration =
      typeof req?.body?.duration !== 'number' || req.body.duration < 0
        ? undefined
        : req.body.duration;
    const budget =
      typeof req?.body?.budget !== 'number' || req.body.budget < 0
        ? undefined
        : req.body.budget;

    if (!title || !link || !duration || !budget) return res.sendStatus(400);

    const lastItemIndex = FILM?.length !== 0 ? FILM.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? FILM[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = { id: nextId, title, link, duration, budget };

    FILM.push(newFilm);

    return res.json(newFilm);
  });



module.exports = router;