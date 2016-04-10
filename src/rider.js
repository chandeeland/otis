"use strict";

function Rider() {
  var desiredFloor = null,
    start = Date.now(),
    script = [],
    active = true,

    runScript = function (script) {
      start = Date.now();
      return script[0].call(this, script[1]);
    },

    setFloor = function (f) {
      desiredFloor = f;
      if (f !== null) { active = true; }
    },

    wait = function (t) {
      active = false;
      setFloor(null);
      setTimeout(runScript(script.shift), t);
    };

  script = [
    [wait, 30 ],
    [setFloor, 4 ],
    [wait, 180],
    [setFloor, 1 ],
    [wait, 45],
    [setFloor, 4 ],
    [wait, 240],
    [setFloor, 1 ],
  ];

  this.wants = function (f) {
    if (active) {
      if (desiredFloor > f) { return 'UP'; }
      if (desiredFloor < f) { return 'DOWN'; }
    }
    return 'OFF';
  };

  this.wants_off = function (f, d) {
    return d !== this.wants(f);
  };

  this.wants_on = function (f, d) {
    return !this.wants_off(f, d) && active;
  };

  this.prize = function () {
    var current_time = Date.now();
    return Math.abs(start - current_time);
  };

}
