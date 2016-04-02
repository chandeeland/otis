CARS_PER_PLAYER = 2;

function Building(floors_count) {
  this.floors = new Array(floors_count).fill([]);

  this.addCar = function(playerId, floor) {
    for (var i = 0; i < CARS_PER_PLAYER; i++) {
      this.cars.push(new Car(playerId, this, this.cars.length));
    }
  };

  this.getCars = function(playerId) {
    return this.cars.filter(funciton(car) { return car.playerId == playerId; });
  };

  this.takeRider = function(rider, floor) {
    if (rider.floor == floor)
      return rider.score(floor);
    } else {
      this.floors[floor].push(rider);
      reutrn 0;
    }
  }
};
