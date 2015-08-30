var hangmanApp = angular.module('hangmanApp', ['ngStorage']);

hangmanApp.controller('GameController', ['$scope', '$http', '$localStorage', '$element', function($scope, $http, $localStorage, $element) {

  $scope.activeGame = false;
  $scope.youLost = false;
  $scope.youWin = false;
  $scope.currentWord = '';
  $scope.workingWord = [];
  $scope.guessesLeft = 10;
  $scope.charactersGuessed = [];
  $scope.characters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ];

  $scope.$storage = $localStorage.$default({
    hangman: { wins: 0, loses: 0, streak: 0, lastPlayed: '' },
  });

  $scope.newGame = function() {
    $http({
      method: 'GET',
      url: '/new-game',
    }).success(function(data) {
      $scope.currentWord = data.word;
      $scope.workingWord = data.workingWord;
      $scope.activeGame = true;
      $scope.youLost = false;
      $scope.youWin = false;
      $scope.guessesLeft = 10;
      $scope.charactersGuessed = [];
    });
  };

  $scope.makeGuess = function(character) {
    if ($scope.youLost || $scope.youWin) {
      return;
    }

    $http({
      method: 'POST',
      url: '/check-character',
      data: { character: character },
    }).success(function(data) {
      $scope.charactersGuessed.push(character);
      $scope.workingWord = data.workingWord;

      if (!data.characterStatus) {
        $scope.guessesLeft = $scope.guessesLeft - 1;

        if ($scope.guessesLeft === 0) {
          $scope.youLost = true;
          $scope.$storage.hangman.loses = $scope.$storage.hangman.loses + 1;
          $scope.$storage.hangman.streak = 0;
        }
      } else {
        if ($scope.workingWord.indexOf(' ') === -1) {
          $scope.youWin = true;
          $scope.$storage.hangman.wins = $scope.$storage.hangman.wins + 1;
          $scope.$storage.hangman.streak = $scope.$storage.hangman.streak + 1;
        }
      }
    });

    $scope.pendingCharacter = function(character) {
      if (character === ' ') {
        return true;
      } else {
        return false;
      }
    };
  };
},]);
