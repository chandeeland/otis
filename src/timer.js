function Timer(func, delay) {
  var done = false;
  var callback = function() {
    done = true ;
    return func();
  };
  var startTime = Date.now();

  var timeout = setTimeout(callback, delay);

  this.add = function(ms) {
    if (!done) {
      this.cancel();
      delay = delay - (Date.now() - startTime) + ms;
      timeout = setTimeout(callback, delay);
    }
  };

  this.cancel = function() {
    clearTimeout(timeout);
  };

  this.immediately = function() {
    if (!done) {
      this.cancel();
      callback();
    }
  };
};

function TimerLoop(func, interval, doneCondition = null) {
  var done = null;
  var callback = null;

  var setCallback = function(func) {
    callback = function() {
      if (!done()) {
        timeout = setTimeout(callback, interval);
        func();
      }
    };
  };

  var setDone(f) {
    if (typeof(f) == 'function') {
      done = f;
    } else {
      done = function() {
        return f;
      }
    }
  }

  setCallback(func);
  setDone(doneCondition);
  var timeout = setTimeout(callback, interval);

  return {
    stop: function(doneCondition = true) {
      clearTimeout(timeout);
      setDone(doneCondition);
    },
    start: function(doneCondition = false) {
      setDone(doneCondition);
    },
    restart: function(func, doneCondition= false) {
      if (timeout != null) clearTimeout(timeout);
      setCallback(func);
      setDone(doneCondition);
      timeout = setTimeout(callback, interval);
    }
  };
}
