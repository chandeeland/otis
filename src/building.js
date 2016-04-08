function Building(floors_count) {
  var floors = new Array(floors_count).fill([]);

  this.addCar = function(playerId, floor) {
    this.cars.push(new Car(playerId, this, this.cars.length));
  };

  this.getCars = function(playerId) {
    return this.cars.filter(funciton(car) { return car.playerId == playerId; });
  };

  this.recieveRider = function(rider, floor) {
    this.floors[floor].shift(rider);
    if (rider.floor == floor)
      return rider.score(floor);
    } else {
      reutrn 0;
    }
  };

  this.departRider = function(f, d) {
    var i = floors[f].findIndex(function(rider) {
      rider.wants_on();
    });

    if (i >= 0) {
      var rider = floor[f][i];
      floors[f].slice(i, 1);
      return rider;
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
