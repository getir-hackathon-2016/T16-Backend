module.exports = {
   root: function(req, res, next){
      res.send("nö!");
      next();
   }
};
