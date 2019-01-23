angular.module('app')
    .service('api', ['$q', '$firebaseArray', 'config', function ($q, $firebaseArray, config) {
    var ref = firebase.database().ref();

    return {
        getEvents: function () {
            var q = $q.defer();
            var events = $firebaseArray(ref.child('events').orderByChild('start'));
            events.$loaded().then(function (s) {
                q.resolve(events);
            })
            return q.promise;
        },
        addEvent: function (evnt) {
            var q = $q.defer();
            var event = {
                title: evnt.title,
                desc: evnt.desc,
                cover: evnt.cover || 'https://scontent.fskp1-1.fna.fbcdn.net/v/t39.5549-6/s2048x2048/12409802_989808747728106_1038253242_n.jpg?_nc_cat=102&_nc_ht=scontent.fskp1-1.fna&oh=de7105cf2ce786097e58200e27d46b06&oe=5CA483DF',
                start: evnt.entireDay ?
                    moment(evnt.startDate).format('YYYY-MM-DD') :
                    moment(moment(evnt.startDate).format('YYYY-MM-DD') + " " + moment(evnt.startTime).format('HH:mm:ss')).format(),
                private: evnt.private,
                location: evnt.location || '',
                created: moment().format()
            }
            if (evnt.isEnd && evnt.endDate) {
                event.end = event.endTime ?
                    moment(moment(evnt.endDate).format('YYYY-MM-DD') + " " + moment(evnt.endTime).format('HH:mm:ss')).format() :
                    moment(evnt.endDate).format('YYYY-MM-DD');
            }
            console.log(event);

            var events = $firebaseArray(ref.child('events'));
            events.$add(event)
                .then(function (s) {
                    q.resolve(s);
                })
            return q.promise;
        },
        getBooks: function () {
            var q = $q.defer();
            var books = $firebaseArray(ref.child('books').orderByChild('title'));
            books.$loaded().then(function (s) {
                q.resolve(s);
            })
            return q.promise;
        },
        getLendedBooks: function () {
            var q = $q.defer();
            var books = $firebaseArray(ref.child('lend').orderByChild('returned').equalTo(false));
            books.$loaded().then(function (s) {
                // var books = $firebaseArray(ref.child('books').orderByChild('lended').equalTo(true));
                q.resolve(s);
            })
            return q.promise;
        },
        getNotifications: function () {
            var q = $q.defer();
            var notifications = $firebaseArray(ref.child('notifications').child('admin').orderByChild('created'));
            notifications.$loaded().then(function (s) {
                q.resolve(s);
            })
            return q.promise;
        },
        lendBook: function (book, user) {
            var q = $q.defer();
            if (book.lended === true) q.reject();

            var lend = {
                book: book,
                bid: book.$id,
                uid: user.uid,
                user: user,
                extended: false,
                returned: false,
                lendDate: moment().format(),
                returnDate: moment().add(config.lendTime, 'day').format()
            }
            var lended = $firebaseArray(ref.child('lend'));
            lended.$add(lend)
                .then(function (s) {
                    ref.child('books').child(book.$id).update({ lended: true })
                    q.resolve(s);
                })
            return q.promise;
        },
        returnLend: function (lend) {
            var q = $q.defer();
            ref.child('books').child(lend.bid).update({ lended: false })
            ref.child('lend').child(lend.$id).update({ returned: true })
            q.resolve();
            return q.promise;
        },
        extendLend: function (lend) {
            var q = $q.defer();
            if (!lend.extend) {
                if(confirm(`Are you sure you want to extend lend book "${lend.book.title}" for ${lend.user.displayName}?`)) {
                ref.child('lend').child(lend.$id).update({ extended: true })
                ref.child('lend').child(lend.$id).update({ returnDate: moment(lend.returnDate).add(config.extendLendTime, 'day').format() })
                q.resolve();
                } else {
                    q.reject(`Canceled`);
                }
            }
            else {
                q.reject(`Can't extend lending`);
            }
            return q.promise;
        },
        removeNotification: function (n) {
            var q = $q.defer();
            console.log(ref.child('notifications').child('admin').child(n.$id));
            
            ref.child('notifications').child('admin').child(n.$id).remove();
            return q.promise;
        },
        sendNotification: function (lend, template) {
            var q = $q.defer();
            var notification = {
                // data: {
                    lend: lend,
                    lid: lend.$id,
                    uid: lend.uid,
                    readed: false,
                    sendDate: moment().format(),
                    template: template
                // }
            }

            // var params = {
            //     registration_ids: listIds,// or "to" param
            //     data: {
            //         body: $scope.message,
            //         title: $scope.title
            //     },
            //     body: $scope.message,
            //     title: $scope.title
            // };

            // params = {
            //     app_id: 'AIzaSyDKj39N_EB1J1zykG1f_HeRiOmakgSyLfs',
            //     included_segments: ["All"],
            //     data: {
            //         body: $scope.message,
            //         title: $scope.title
            //     },
            //     contents: { "en": "Are you ok? Open the app" },
            //     headings: { "en": "Hello Carlos" }
            // };

            // jQuery.ajax({
            //     url: ajaxUrl,
            //     method: 'post',
            //     contentType: 'application/json',
            //     processData: false,
            //     dataType: 'json',
            //     headers: {
            //      // Authorization: 'key='+API_ACCESS_KEY
            //       Authorization: 'Basic '+token
            //     },
            //     data: JSON.stringify(params)
            //   })
            // var messaging = firebase.messaging();

            // var message = {
            //     data: {
            //         score: '850',
            //         time: '2:45'
            //     },
            //     token: 'registrationToken'
            // };
            var notifications = $firebaseArray(ref.child('notifications'));
            notifications.$add(notification)
                .then(function (s) {
                    q.resolve(s);
                })
            return q.promise;
        },
        getUsers: function () {
            var q = $q.defer();
            var users = $firebaseArray(ref.child('users').orderByChild('lastlogin'));
            users.$loaded().then(function (s) {
                q.resolve(s);
            })
            return q.promise;
        }
    };
}])
