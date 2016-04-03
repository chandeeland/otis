// doorStates OPEN FORCE_OPEN CLOSED
// carStates GOING UP, GOING DOWN, HOLDING

function Car(playerId, building, id) {
  var id = id;
  var playerId = playerId;
  var building = building;

  var carState = 'HOLDING';
  var doorState = 'CLOSED'

  var riders = [];

  var currentFloor = 1;
  var directionIndicator = null;
  var score = 0;
  var arrivalTime = null;
  var riderLoadTime = null;

  loadRiders() {
    var capacity = MAX_RIDERS - riders.length;
    var numLostRiders = 0;
    var i = riders.length;

    while(--i) {
      if (riders[i].wants_off(currentFloor, directionIndicator)) {
        score += building.takeRider(riders[i], currentFloor);
        riders.splice(i, 1);
        numLostRiders++;
      }
    }
    capacity += numLostRiders;

    var newRiders = building.floors[currentFloor]
      .filter(function(r) {
        return r.wants_on(currentFloor, directionIndicator);
      })
      .slice(0,capacity);

    riders = riders.concat(newRiders);

    reutrn (newRiders.length + numLostRiders) * LOAD_DELAY;
  };

  setCurrentFloor = function(f) {
    if (doorState != 'CLOSED') {
      //emit error
      return false;
    }
    clearTimeout(arrivalTime);
    arrivalTime = setTimeout(function() {
      currentFloor = f;
      carState = 'HOLDING'
    }, MOVE_DELAY);

    return carState;
  };

  closeDoor = function() {
    doorState = 'CLOSED';
  };


  this.openDoor = function() {
    if (carState != 'HOLDING') {
      return false;
    }
    if (doorState != 'OPEN') {
      doorState = 'OPEN';
      clearTimeout(riderLoadTime);
      riderLoadTime = setTimeout(closeDoor, loadRiders());
    }
  };

  this.setDirectionIndicator = function(d) {
    if (d != UP && d != DOWN) {
      // error
      return
    }
    directionIndicator = d;
  };

  this.move = function(d) {
    var deltas = {
      UP: 1,
      DOWN: -1
    };
    if (deltas[d] != undefined) {
      var newFloor = currentFloor + deltas[d];
      if (building.floors.length > newFloor && newFloor > 0) {
        if (carState != 'GOING '+ d) {
          carState = 'GOING '+ d;
          return this.setCurrentFloor(newFloor);
        }
      }
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
