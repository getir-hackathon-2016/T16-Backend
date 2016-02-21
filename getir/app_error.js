var error = {
   "UNKNOWN": {
      "code": 100,
      "text": {
         "en": "Unknown error.",
         "tr": "Tanımlanmamış hata."
      }
   },
   "NO_ROUTE": {
      "code": 101,
      "text": {
         "en": "No route found.",
         "tr": "Yol bulunamadı."
      }
   },
   "MISSING_HEADER": {
      "code": 102,
      "text": {
         "en": "Missing header.",
         "tr": "Eksik başlık."
      }
   },
   "MISSING_PARAM": {
      "code": 103,
      "text": {
         "en": "Missing parameter.",
         "tr": "Eksik parametre."
      }
   },
   "AUTHORIZATION": {
      "code": 104,
      "text": {
         "en": "Unauthorized request.",
         "tr": "Yetkisiz istek."
      }
   },

   "LOGIN_EMPTY": {
      "code": 200,
      "text": {
         "en": "Username/password couldn't be empty.",
         "tr": "Kullanıcı adı/şifre boş olamaz."
      }
   },
   "LOGIN_MATCH": {
      "code": 201,
      "text": {
         "en": "Username/password doesn't match.",
         "tr": "Kullanıcı adı/şifre uyuşmuyor."
      }
   }
};

// @todo Must be improved.
var get = function(key, req){
   var lang = req.header("Accept-Language");
   if (lang != "en" || lang != "tr") {
      lang = "en";
   }

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
};

module.exports = error;
module.exports.get = get;
