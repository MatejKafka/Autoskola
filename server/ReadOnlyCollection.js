// Generated by CoffeeScript 1.11.1
(function() {
  var ReadOnlyCollection;

  module.exports = ReadOnlyCollection = (function() {
    function ReadOnlyCollection(items) {
      var i, item, len, ref;
      this.items = items;
      this.__defineGetter__('length', (function(_this) {
        return function() {
          return _this.items.length;
        };
      })(this));
      this._idCache = {};
      ref = this.items;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        this._idCache[item.id] = item;
      }
    }

    ReadOnlyCollection.prototype.get = function(id) {
      if (id == null) {
        return this.items;
      }
      if (this._idCache[id] != null) {
        return this._idCache[id];
      }
      return null;
    };

    ReadOnlyCollection.prototype.filter = function(fn) {
      return new ReadOnlyCollection(this.getFiltered(fn));
    };

    ReadOnlyCollection.prototype.getFiltered = function(fn) {
      return this.items.filter(fn);
    };

    ReadOnlyCollection.prototype.forEach = function(fn) {
      this.items.forEach(fn);
    };

    ReadOnlyCollection.prototype.map = function(fn) {
      return new ReadOnlyCollection(this.getMapped(fn));
    };

    ReadOnlyCollection.prototype.getMapped = function(fn) {
      return this.items.map(fn);
    };

    return ReadOnlyCollection;

  })();

}).call(this);

//# sourceMappingURL=ReadOnlyCollection.js.map
