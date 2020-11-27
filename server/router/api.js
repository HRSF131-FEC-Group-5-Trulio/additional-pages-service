const { Router } = require('express');
const db = require('../../db/seed-database')

const router = Router();

router.get('/:id/property', (req, res) => {
  db.fetch((err, data) => {
    if(err) {
      console.log('error in getproperty: ', err);
      res.sendStatus(404);
    }
    console.log('this is data: ', data)
      db.fetchById(data.relatedProperties, (err, properties) => {
        res.json(JSON.stringify(properties));
      });
  })
});

router.post('/:id/favorites', (req, res) => {
  db.post(+req.params.id, (err, data) => {
    if(err) {
      console.log('error in post: ', err);
      res.sendStatus(404);
    }
    res.json(data);
  })
});

router.get('/favorites', (req,res) => {
  db.getAllFavorites((err, data) => {
    if(err) {
      console.log('error in get: ', err);
      res.sendStatus(404);
    }
    res.json(JSON.stringify(data));
  })
});
router.post('/resetFavorites', (req, res) => {
  db.resetFavorites((err, data) => {
    if(err) {
      console.log('error resetting!!', err);
      res.sendStatus(404);
    }
    res.status(200);
    res.end();
  })
});
module.exports = router;