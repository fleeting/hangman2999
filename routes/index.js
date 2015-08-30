var Game = require('../models/game');

module.exports = function(app) {
  app.get('/new-game', function(req, res) {
    Game.newGame(req, res);
  });

  app.post('/check-character', function(req, res) {
    Game.checkCharacter(req, res);
  });

  app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
  });
};
