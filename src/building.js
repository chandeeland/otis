/LOAD_DELAY = 2;
MOVE_DELAY = 10;


var BUILDING = (function(floors_count) {
  var building = {};
  this.floors = new Array(floors_count).fill([]);

  function car(owner, building, id) {
    this.id = id;
    this.owner = owner;
    this.building = building;
    this.riders = [];
    this.state = 'READY';
    this.floor = 1;
    this.direction = '';
    this.score = 0;

    this.move = function(requested_floor) {
      if (requested_floor <= 0 || requested_floor > this.building.floors.length) {
        // error
      }
      if (this.state != 'READY') {
        // error
      }
      this.state == 'MOVING';
      this.move_time_lapse(this.floor, requested_floor)
    };

    this.status = function() {
      var status = {};
      status['occupancy'] = this.riders.length;
      status['requested_floors'] = this.riders.map(function(r) {r.floor} );
      status['direction'] = this.direction;
      status['score'] = this.score;
      status['state'] = this.state;
      status['floor'] = this.floor;
      return status;
    }


    this.setDirection = function(direction) {
      if (direction != 'UP' && direction != 'DOWN') {
        // error
        return
      }
      if (direction != this.direction) {
        this.direction = direction;
        if (this.state == 'READY' || this.state == 'DOOR_OPEN') {
          this.open_door();
        }
      }
    };

    this.setFloor = function(floor) {
      this.floor = floor;
      //emit
    };

    this.addScore = function(points) {
      this.score += points;
      //emit
    };

    this.setState = function(status) {
      this.state = status;
    };

    this.move_time_lapse(start,end) {
      var step = 1;
      var delta = Math.abs(start - end);
      if (start > end) { step = -1 }
      for (var i = 1; i <= delta; i += step) {
        setTimeout(function() {
          this.setFloor(start + i);
          if (this.floor == end) {
            this.open_door();
          }
        }, MOVE_DELAY * i);
      }
    };

    this.disembark_rider = function(i) {
      this.addScore(this.riders[i].score(this));
      if (rider.floor != this.floor) {
        this.building.floors[this.floor].push(rider);
      }
      this.riders.splice(i, 1);
    };

    this.disembark = function() {
      var len = this.riders.length;
      var disembark_time = 0
      for (i = 0; i < len; i++) {
        if (this.riders[i].wants_off(this)) {
          disembark_time++;
          this.disembark_rider(i);
        }
      }
      return disembark_time;
    };

    this.board = function() {
      var board_time = 0;
      var len = this.building.floors[this.floor].length;
      for (i = len; i >= 0; i--) {
        if (this.riders.count > 9) { break; }

        var rider = this.building.floors[this.floor][i];
        if (rider.wants_on) {
          board_time++;
          this.riders.push(rider);
          this.building.floors[this.floor].splice(i,1);
        }
      }
      return board_time;
    };

    this.open_door = function() {
      this.state = 'DOOR_OPEN';
      clearTimeout(open_door_wait);
      var load_time = this.disembark() + this.board();
      clearTimeout(open_door_wait);
      open_door_wait = setTimeout(this.close_door, load_time * LOAD_DELAY);
    };

    this.close_door = function() {
      this.setState('READY');
      // emit
    }

  };


  this.rider = function(floor) {
    this.floor = floor;
    this.start = Date.now();

    this.direction(current_floor) {
      if (this.floor > current_floor) {
        return 'UP';
      }
      return 'DOWN';
    };

    this.wants_off = function(car) {
      if (car.floor == this.floor) {
        return true;
      }
      if (car.direction == 'UP' && car.floor > this.floor) {
        return true;
      }
      if (car.direction == 'DOWN' && car.floor < this.floor) {
        return true;
      }
      return false;
    };

    this.wants_on = function(car) {
      return !this.wants_off(car);
    }

    this.score(car) {
      var current_time = Date.now();
      if (car.floor == this.floor) {
        //emit
        return Math.abs(this.start - current_time);
      }
      return 0;
    };
  };




  building.cars = [];

  building.addCar = function(owner, floor) {
    this.cars.push(new car(owner, this, this.cars.length));
  };

  building.getCars = function(owner) {
    return this.cars.filter(funciton(car) { return car.owner == owner; });
  };

  building.moveCar = function(owner, id, floor) {
    cars = this.cars.filter(function(car) { return car.id == id && car.owner = owner });
    return cars[0].move(floor);
  };

  building.status = function(owner) {
    var status = {};
    status['cars'] = this.getCars(owner).map(function(car) { car.status();} );
    status['calls'] = this.floors.map(function(riders) {
      var calls = {};
      calls['UP'] = riders.filter(function(rider) {return ider.direction() == 'UP';}).length;
      calls['DOWN'] = riders.length - calls['UP'];
      return calls;
    });
    return status;
  };

  return building;
}());
