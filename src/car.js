// doorStates OPEN FORCE_OPEN CLOSED
// carStates GOING UP, GOING DOWN, HOLDING

function Car(playerId, building, id) {
  var id = id;
  var playerId = playerId;
  var building = building;

  var carState = 'HOLDING';
  var doorState = 'CLOSED'

  var riders = [];

  var currentFloor = 1.0;
  var directionIndicator = null;
  var score = 0;
  var moveTimer = null;
  var riderLoadTimer = null;

  unloadRiders = function() {
    var finder = function(rider, i, arr) {
      return rider.wants_off();
    };

    if (var i = riders.findIndex(finder)) {
      score += building.takeRider(riders[i], currentFloor);
      riders.splice(i,1);
      return 1;
    }
    return 0;
  };

  loadRiders = function() {
    if (MAX_RIDERS > riders.length) {
      if (var rider = building.getRider(currentFloor, directionIndicator)) {
        riders.push(rider);
        return 1
      }
    }
    return 0;
  };

  this.closeDoor = function() {
    doorState = 'CLOSED';
    riderLoadTimer.stop();
  };


  this.openDoor = function() {
    if (carState != 'HOLDING') {
      return false;
    }
    if (doorState != 'OPEN') {
      doorState = 'OPEN';
      riderLoadTimer = new TimerLoop(function() {
        return unloadRiders() && loadRiders();
      }, LOAD_DELAY);
    }
  };

  this.setDirectionIndicator = function(d) {
    if (d != UP && d != DOWN) {
      // error
      return
    }
    directionIndicator = d;
  };

  moveTimer = null;
  moveIncrement = function(step) {
    return function() {
      carState = 'MOVING';
      currentFloor += step;
    };
  };
  moveDone = function(destination) {
    return function() {
      if (currentFloor == destination) {
        carState = 'HOLDING';
        return true;
      };
      return false;
    };
  }

  this.move = function(destination) {
    if (doorState != 'CLOSED') {
      //emit error
      return false;
    }
    if (building.floors.length > newFloor && newFloor > 0) {
      // error, out of range
      return false;
    }

    var step = (currentFloor > destination) ? -0.2 : 0.2);

    if (moveTimer == null) {
      moveTimer = new TimeLoop(
        moveIncrement(step), MOVE_DELAY, moveDone(destination)
      );
    } else {
      moveTimer.restart(moveIncrement(step), moveDone(destination))
    }
    return carState;
  };

  this.status = function() {
    var status = {};
    status['occupancy'] = riders.length;
    status['requestedFloors'] = riders.map(function(r) {r.floor} );
    status['directionIndicator'] = directionIndicator;
    status['score'] = score;
    status['doorState'] = doorState;
    status['carState'] = carState;
    status['currentFloor'] = currentFloor;
    return status;
  }

};
