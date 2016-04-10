"use strict";

function Building(floors_count) {
  var floors = new Array(floors_count).fill([]),
    cars = {};

  this.addCar = function (playerId) {
    if (!cars.hasOwnProperty(playerId)) {
      cars[playerId] = [];
    }
    cars[playerId].push(new Car(playerId, this));
  };

  this.getCars = function (playerId) {
    return this.cars[playerId];
    // return this.cars.filter(funciton(car) { return car.playerId === playerId; });
  };

  this.recieveRider = function (rider, floor) {
    this.floors[floor].shift(rider);
    if (rider.floor === floor) {
      return rider.score(floor);
    }
    return 0;
  };

  this.departRider = function (f) {
    var rider = null,
      i = floors[f].findIndex(function (rider) {
        rider.wants_on();
      });

    if (i >= 0) {
      rider = floors[f][i];
      floors[f].slice(i, 1);
      return rider;
    }
  };

  this.status = function () {
    return floors.map(function (riders) {
      var calls = {};
      calls.UP = riders.filter(function (rider) {
        return rider.direction() === UP;
      }).length > 0;

      calls.DOWN = riders.filter(function (rider) {
        return rider.direction() === DOWN;
      }).length > 0;
      return calls;
    });
  };
}
