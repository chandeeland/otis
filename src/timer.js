function Timer(func, ms) {
  var done = false;
  var callback = function() {
    done = true;
    return func();
  };
  var delay = ms;
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
