function Rider(floor) {
  this.floor = floor;
  this.start = Date.now();
  this.active = true;

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
    return !this.wants_off(car) && rider.active;
  }

  this.score() {
    var current_time = Date.now();
    return Math.abs(this.start - current_time);
  };
};
