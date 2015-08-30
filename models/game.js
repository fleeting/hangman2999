exports.newGame = function(req, res) {
  selectedWord = selectWord();

  workingWord = [];
  for (var i = 0; i < selectedWord.length; i++) {
    workingWord[i] = ' ';
  }

  req.session.word = selectedWord;
  req.session.workingWord = workingWord;
  res.json({ word: selectedWord, workingWord: workingWord });
};

var selectWord = function() {
  game = require('../game.json');
  word = game.words[Math.floor(Math.random() * (12 - 1)) + 1];

  return word;
};

exports.checkCharacter = function(req, res) {
  status = req.session.word.indexOf(req.body.character) !== -1;
  var wordCharacters = req.session.word.split('');
  var workingWord = req.session.workingWord;

  if (status) {
    for (var i = 0; i < workingWord.length; i++) {
      if (workingWord[i] === ' ' && wordCharacters[i].toLowerCase() === req.body.character.toLowerCase()) {
        workingWord[i] = wordCharacters[i];
      }
    }
  }

  res.json({ characterStatus: status, workingWord: workingWord });
};
