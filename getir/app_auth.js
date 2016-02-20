module.exports = {
   generateAccessToken: function(){
      return (1 + Math.random()).toString(15).substring(2, 2 + 32);
   },
   validateAccessToken: function(accessToken){
      // @todo
   }
};
