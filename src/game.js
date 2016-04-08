var uuid = require('node-uuid');
var Building = require('building.js');
var Car = require('car.js');
var Rider = require('rider.js');

var MAX_FLOORS = 14;
var CARS_PER_PLAYER = 2;
var LOAD_DELAY = 500;
var MOVE_DELAY = 200;
var MAX_RIDERS = 9;
var UP = 'UP';
var DOWN = 'DOWN'

var GAME = (function(MAX_FLOORS) {
  var game = {
    building: new Building(MAX_FLOORS)
    findCar = function(playerId, carId) {
      cars = building.getCars(playerId)
        .filter(function(car) { return car.id == carId; });
      if (cars.length = 0) {
        // emit error
      }
      return cars.shift();
    };
  };

  game.newPlayer = function() {
    var playerId = uuid.v4();
    for (var i = 0; i < CARS_PER_PLAYER; i++) {
      building.addCar(playerId);
    }
    return playerId;
  }

  game.moveCarUp= function(playerId, carId) {
    var car = findCar(playerId, carId)
    if (car) return car.move('UP');
  };

  game.moveCarDown= function(playerId, carId) {
    var car = findCar(playerId, carId)
    if (car) return car.move('DOWN');
  };

  game.setIndicatorLightUp = function(playerId, carId) {
    var car = findCar(playerId, carId)
    if (car) return car.setDirectionIndicator('UP');
  };

  game.setIndicatorLightDown = function(playerId, carId) {
    var car = findCar(playerId, carId)
    if (car) return car.setDirectionIndicator('DOWN');
  };

  game.openCarDoor = function(playerId, carId) {
    var car = findCar(playerId, carId)
    if (car) return car.openDoor();
  };

  game.status = function(playerId) {
    var status = {};
      status['cars'] = building.getCars(playerId).map(
        function(car) { return car.status(); }
      );
      status['calls'] = building.status();
      return status;
    };
  return  game;
}());
