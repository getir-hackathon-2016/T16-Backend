var error = {
   "UNKNOWN": {
      "code": 1,
      "text": {
         "en": "Unknown error.",
         "tr": "Tanımlanmamış hata."
      }
   },
   "LOGIN_EMPTY": {
      "code": 100,
      "text": {
         "en": "Username/password couldn't be empty.",
         "tr": "Kullanıcı adı/şifre boş olamaz."
      }
   },
   "LOGIN_MATCH": {
      "code": 101,
      "text": {
         "en": "Username/password doesn't match.",
         "tr": "Kullanıcı adı/şifre uyuşmuyor."
      }
   }
};

// @todo Must be improved.
var get = function(key, req){
   var lang = req.header("Accept-Language", "en");
   if (lang == "en" || lang == "tr") {
      for (var k in error) {
         if (k == key && error.hasOwnProperty(k)) {
            return {
               "code": error[k]["code"],
               "text": error[k]["text"][lang]
            };
         }
      }

      return {
         "code": error.UNKNOWN.code,
         "text": error.UNKNOWN.text[lang]
      }
   }
};

module.exports = error;
module.exports.get = get;
