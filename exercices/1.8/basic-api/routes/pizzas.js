const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');


const router = express.Router();


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
  
  /* Duration of movie */
  router.get('/', (req, res) => {
    const minFilmDuration = req?.query ? parseInt(req.query['minimum-duration'],10) : undefined;

    const films=parse(jsonDbPath, FILM);

    if( typeof minFilmDuration !=='number' || minFilmDuration<=0 )
    return res.sendStatus(400);

    if(!minFilmDuration) return res.json(FILM);

    const filmsReachingMinimumDuration = films.filter((film)=> film.duration >= minFilmDuration);
    
    return res.json(filmsReachingMinimumDuration);
  });
   /** Id */
  router.get('/:id',(req,res)=>{
    const films = parse(jsonDbPath,FILM);

    const indexOfFilm = films.findIndex((movie)=>movie.id === req.params.id);

    if(indexOfFilm<0) return res.sendStatus(400); 
    
    return res.json(films[indexOfFilm]);
  });

    /** Create a new movie */
  router.post('/',(req, res) =>{
    const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
    const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0? undefined: req.body.duration;
    const budget =
      typeof req?.body?.budget !== 'number' || req.body.budget < 0? undefined: req.body.budget;

    if (!title || !link || !duration || !budget) return res.sendStatus(400);

    const films = parse(jsonDbPath,FILM);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = { id: nextId, title, link, duration, budget };

    films.push(newFilm);
    
    serialize(jsonDbPath,films);

    return res.json(newFilm);
  });

  router.delete('/:id',(req,res) => {
    console.log(`DELETE /films/${req.params.id}`);
    const films = parse(jsonDbPath, FILM);

    const indexFilm = films.findIndex((movie)=> movie.id === req.params.id);
    
    if(indexFilm<0) return res.sendStatus(400); 

    const filmsRemoved= films.splice(indexFilm,1);
    const filmRemoved = filmsRemoved[0];

    serialize(jsonDbPath,films);

    return res.json(filmRemoved);
  });

  router.patch('/:id',(req,res)=>{
    const title= req?.body?.title;
    const duration= req?.body?.duration;
    const budget= req?.body?.budget;
    const link = req?.body?.link;

    if((title !== undefined && !title)||
    (link !== undefined && !link)||
    (duration !== undefined && (typeof req?.body?.duration !== 'number'|| duration<0))||
    (budget !== undefined && (typeof req?.body?.budget !== 'number'||budget<0))) return req.sendStatus(400);

    const films = parse(jsonDbPath,FILM);

    const foundIndex = films.findIndex((film)=> film.id === req.params.id);

    if(foundIndex<0) return res.sendStatus(400);

    const updateFilm= {...films[foundIndex],...req.body};

    films[foundIndex]=updateFilm;
    
    serialize(jsonDbPath,films);

    return res.json(updateFilm);

  });



module.exports = router;