// safe trim
function trim(input) {
   return (input != null)
      ? (""+ input).trim() : "";
}

function extend(target, source) {
   for (var i in source) {
      target[i] = source[i];
   }
   return target;
}

module.exports = {
   trim: trim,
   extend: extend
};
