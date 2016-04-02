LOAD_DELAY = 2;
MOVE_DELAY = 10;
MAX_RIDERS = 9;

function Car(playerId, building, id) {
  this.id = id;
  this.playerId = playerId;
  this.building = building;

  this.carState = 'HOLDING';
  this.doorState = 'CLOSED'

  this.riders = [];

  this.currentFloor = 1;
  this.directionIndicator = 'UP';
  this.score = 0;
  this.arrivalTime = null;
  this.riderLoadTime = null;


  this.open_door = function() {
    if (this.carState != 'HOLDING') {
      return false;
    }
    if (this.doorState != 'OPEN') {
      this.doorState = 'OPEN';
      clearTimeout(this.riderLoadTime);
      this.riderLoadTime = setTimeout(this.close_door, this.loadRiders());
    }
  };

  this.loadRiders() {
    var capacity = MAX_RIDERS - this.riders.length;
    var numLostRiders = 0;
    var i = this.riders.length;
    while(--i) {
      if (this.riders[i].wants_off(this.currentFloor, this.directionIndicator)) {
        this.score += this.building.takeRider(this.riders[i], this.currentFloor);
        this.riders.splice(i, 1);
        numLostRiders++;
      }
    }
    capacity += numLostRiders;

    var newRiders = this.building.floors[this.currentFloor]
      .filter(function(r) {
        return r.wants_on(this.currentFloor, this.directionIndicator);
      })
      .slice(0,capacity);

    this.riders = this.riders.concat(newRiders);

    reutrn (newRiders.length + numLostRiders) * LOAD_DELAY;
  };

  this.close_door = function() {
    this.doorState = 'CLOSED';
  };

  this.setDirectionIndicator = function(d) {
    if (d != 'UP' && d != 'DOWN') {
      // error
      return
    }
    this.directionIndicator = d;
  };

  this.move(direction) {
    var deltas = {
      'UP': 1,
      'DOWN': -1
    };
    if (deltas[direction] == undefined) return this.currentFloor;

    var newFloor = this.currentFloor + deltas[direction];
    if (this.building.floors.length > newFloor && newFloor > 0) {
      if (this.carState != 'GOING '+ direction) {
        this.carState = 'GOING '+ direction;
        return this.setCurrentFloor(newFloor);
      }
    }
    return this.currentFloor;
  };

  this.setCurrentFloor = function(f) {
    if (this.doorState != 'CLOSED') {
      return false;
    }
    clearTimeout(this.arrivalTime);
    this.arrivalTime = setTimeout(function() {
      this.currentFloor = f;
      this.carState = 'HOLDING'
    }, MOVE_DELAY);

    return f;
  };

  this.status = function() {
    var status = {};
    status['occupancy'] = this.riders.length;
    status['requestedFloors'] = this.riders.map(function(r) {r.floor} );
    status['directionIndicator'] = this.directionIndicator;
    status['score'] = this.score;
    status['doorState'] = this.doorState;
    status['carState'] = this.carState;
    status['currentFloor'] = this.currentFloor;
    return status;
  }

};
