// safe trim
function trim(input) {
   return (input != null)
      ? (""+ input).trim() : "";
}

module.exports = {
   trim: trim
};
