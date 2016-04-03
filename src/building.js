function Building(floors_count) {
  var floors = new Array(floors_count).fill([]);

  this.addCar = function(playerId, floor) {
    this.cars.push(new Car(playerId, this, this.cars.length));
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
  };

  this.status = function() {
    return floors.map(function(riders) {
        var calls = {};
        calls['UP'] = riders.filter(
          function(rider) {return rider.direction() == UP;}
        ).length > 0;
        calls['DOWN'] = riders.filter(
          function(rider) {return rider.direction() == DOWN;}
        ).length > 0;
        return calls;
    });
  };
};
