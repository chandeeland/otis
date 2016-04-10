var uuid = require('node-uuid'),
  Building = require('building.js'),
  Car = require('car.js'),
  Rider = require('rider.js'),
  MAX_FLOORS = 14,
  CARS_PER_PLAYER = 2,
  LOAD_DELAY = 500,
  MOVE_DELAY = 200,
  MAX_RIDERS = 9,
  UP = 'UP',
  DOWN = 'DOWN';

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
