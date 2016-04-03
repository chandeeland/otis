function Rider() {
  var desiredFloor = null;
  var start = Date.now();
  var active = true;

  var script = [
    function() { this.wait(30);},
    function() { this.setFloor(4);},
    function() { this.wait(180);}
    function() { this.setFloor(1);},
    function() { this.wait(45);}
    function() { this.setFloor(4);},
    function() { this.wait(240);}
    function() { this.setFloor(1);},
  ];

  runScript() {
    f = script.shift();
    start = Date.now();
    return f();
  }

  wait = function(t) {
    active = false;
    setFloor(null);
    setTimeout(this.runScript, t);
  };

  setFloor = function(f) {
    desiredFloor = f;
    if (f != null) active = true;
  }

  this.wants = function(f) {
    if (active) {
      if (this.desiredFloor > f) {
        return 'UP';
      } else if (this.desiredFloor < f) {
        return 'DOWN';
      }
    }
    return 'OFF';
  };

  this.wants_off = function(f, d) {
    return d != wants(f);
  };

  this.wants_on = function(f, d) {
    return !wants_off(f, d) && rider.active;
  };

  this.hasArrived = function(f) {
    return arrived && desiredFloor = f;
  };

  this.prize = function() {
    var current_time = Date.now();
    return Math.abs(this.start - current_time);
  };

};
