angular.module('firebaseConfig', ['firebase'])
  .run(function () {
    var config = {
      apiKey: "AIzaSyD-gTUhW17HLnSElOulKeUgEyQQSOJN3kQ",
      authDomain: "bookify-aac93.firebaseapp.com",
      databaseURL: "https://bookify-aac93.firebaseio.com",
      projectId: "bookify-aac93",
      storageBucket: "bookify-aac93.appspot.com",
      messagingSenderId: "1051030206984"
    };
    firebase.initializeApp(config);
  })

  .service('db', ['$q', '$firebaseArray', '$rootScope', function ($q, $firebaseArray, $rootScope) {
    var ref = firebase.database().ref();
    
    return {
      ref: function () {
        return ref.child('books');
      },
      send: function (nazwa, zdjecie) {
        console.log(nazwa, zdjecie);
        return stor.child(zdjecie.name).put(zdjecie)
      },
      miejsca: function () {
        return miejsca;
      },
      moje: function (user) {
        var q = $q.defer();
        moje = $firebaseArray(ref.child('miejsca').orderByChild('uzytkownik').equalTo(user));
        moje.$loaded().then(function (s) {
          q.resolve(s);
        })

        return q.promise;
      },
      set: function (device, name) {
        ref = ref.child(device);
        if (name) items = $firebaseArray(ref.child(name));
      },
      usun: function (miejsce) {
        return moje.$remove(miejsce);
      },
      zapisz: function (o, uzytkownik, zdjecie) {
        return miejsca.$add({
          adres: o.adres,
          latitude: o.pos.latitude || 0,
          longitude: o.pos.longitude || 0,
          uzytkownik: uzytkownik,
          zdjecie: zdjecie,
          czas: moment().format()
        });
      }
    }
  }]);
