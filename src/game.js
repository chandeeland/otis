include 'building.js';
include 'car.js';
include 'rider.js';

var GAME = (function(floors_count) {
  var game = {
    building: new Building(floors_count)
  };

  game.newPlayer = function(playerId) {
    this.building.addCar(playerId);
    this.building.addCar(playerId);
  }

  game.moveCarUp= function(playerId, id) {
    cars = this.building.getCars(playerId)
      .filter(function(car) { return car.id == id; });
    return cars[0].move('UP');
  };

  game.moveCarDown= function(playerId, id) {
    cars = this.building.getCars(playerId)
      .filter(function(car) { return car.id == id; });
    return cars[0].move('DOWN');
  };

  this.status = function(playerId) {
    var status = {};
      status['cars'] = this.building.getCars(playerId).map(
        function(car) { return car.status(); }
      );
      status['calls'] = this.building.floors.map(function(riders) {
        var calls = {};
        calls['UP'] = riders.filter(
          function(rider) {return ider.direction() == 'UP';}
        ).length;
        calls['DOWN'] = riders.length - calls['UP'];
        return calls;
      });
      return status;
    };
  return  game;
}());
