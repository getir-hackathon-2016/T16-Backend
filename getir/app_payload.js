var klas = require("./util/klas.js");

var Payload = klas.create("Payload", {
   data: {},
   errorCode: 0,
   errorText: "",

   __init__: function(data, errorCode, errorText){
      this.data = data || {};
      this.errorCode = errorCode || 0;
      this.errorText = errorText || "";
   },

   setData: function(data){
      this.data = data;
   },
   setErrorCode: function(errorCode){
      this.errorCode = errorCode;
   },
   setErrorText: function(errorText){
      this.errorText = errorText;
   },

   getData: function(){
      return this.data;
   },
   getErrorCode: function(){
      return this.errorCode;
   },
   getErrorText: function(){
      return this.errorText;
   },

   pack: function(){
      var $this = this;
      return {
         "data": $this.data,
         "error": {
            "code": $this.errorCode,
            "text": $this.errorText
         },
      };
   }
});

module.exports = Payload;
