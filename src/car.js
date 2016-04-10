"use strict";
var MAX_FLOORS = 14;
var CARS_PER_PLAYER = 2;
var LOAD_DELAY = 500;
var MOVE_DELAY = 200;
var MAX_RIDERS = 9;
var UP = 'UP';
var DOWN = 'DOWN';

var uuid = require('node-uuid');

function Car(playerId, building, id) {
  var score = 0,
    riders = [],
    currentFloor = 1.0,
    destinationFloor = null,
    directionIndicator = null,
    moveTimer = null,
    doorTimer = null,

    unloadRiders = function () {
      var i = riders.findIndex(function (rider) {
        return rider.wants_off();
      });
      if (i) {
        score += building.recieveRider(riders[i], currentFloor);
        riders.splice(i, 1);
        return true;
      }
      return false;
    },

    loadRiders = function () {
      if (MAX_RIDERS > riders.length) {
        var rider = building.getRider(currentFloor, directionIndicator);
        if (rider) {
          riders.push(rider);
          return true;
        }
      }
      return false;
    },

    moveInterval = function () {
      var step = (currentFloor > destinationFloor) ? -0.2 : 0.2;
      currentFloor += step;
      if (currentFloor === destinationFloor) {
        clearInterval(moveTimer);
        destinationFloor = null;
      }
    },

    carState = function () {
      if (moveTimer === null) { return 'HOLDING'; }
      if (currentFloor > destinationFloor) { return 'GOING DOWN'; }
      return 'GOING UP';
    },

    doorState = function () {
      if (doorTimer === null) { return 'CLOSED'; }
      return 'OPEN';
    };

  this.playerId = playerId;
  this.id = id;

  this.closeDoor = function () {
    if (doorState() === 'OPEN') {
      clearInterval(doorTimer);
    }
  };

  this.openDoor = function () {
    if (carState() !== 'HOLDING') {
      return false;
    }
    if (doorState() !== 'OPEN') {
      doorTimer = setInterval(function () {
        return unloadRiders() && loadRiders();
      }, LOAD_DELAY);
    }
  };

  this.setDirectionIndicator = function (d) {
    if (d !== UP && d !== DOWN) {
      // error
      return false;
    }
    directionIndicator = d;
  };

  this.move = function (newFloor) {
    if (doorState() !== 'CLOSED') {
      //emit error
      return false;
    }
    if (building.floors.length > newFloor && newFloor > 0) {
      // error, out of range
      return false;
    }

    destinationFloor = newFloor;
    if (carState() === 'HOLDING') {
      moveTimer = setInterval(moveInterval, MOVE_DELAY);
    }
  };

  this.status = function () {
    var status = {};
    status.occupancy = riders.length;
    status.requestedFloors = riders.map(function (r) { return r.floor; });
    status.directionIndicator = directionIndicator;
    status.score = score;
    status.doorState = doorState();
    status.carState = carState();
    status.currentFloor = currentFloor;
    status.destinationFloor = destinationFloor;
    return status;
  };

}
