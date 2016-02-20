var Klas = (function() {
   return {
      create: function(name, prototype){
         // internal
         function Klas() {
            // should be function
            if (this.__init__) {
               this.__init__.apply(this, arguments);
            }
         }

         // add prototype & constructor
         Klas.prototype = prototype;
         Klas.prototype.constructor = Klas;

         // add constructor original name just for
         // debug cos constructor.name is readonly
         Klas.prototype.constructor.nameOrig = name;

         return Klas;
      },

      extend: function(target, source) {
         for (var i in source) {
            // skip private stuff
            if (0 === i.indexOf("_")) {
               continue;
            }

            if (target.prototype) {
               target.prototype[i] = source[i];
            } else {
               target[i] = source[i];
            }
         }

         return target;
      }
   };
})();

module.exports = Klas;
