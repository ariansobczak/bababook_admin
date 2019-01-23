angular.module('app')
    .controller('booksCtrl', ['$scope', '$window', 'NgTableParams', '$firebaseArray', 'api',
        function ($scope, $window, NgTableParams, $firebaseArray, api) {
            api.getBooks().then(function (books) {
                $scope.books = new NgTableParams({
                    group: {
                        genre: "desc"
                      }
                }, {
                        dataset: books,
                        groupOptions: {
                            isExpanded: true
                        }
                    });
            })
            $scope.date = (moment().add(2, 'day')).endOf('day').fromNow();
            $scope.moment = moment;
            $scope.borrowModal = function (book) {
                $scope.choosedBook = book;
                api.getUsers()
                .then(function (users) {
                    $scope.users = new NgTableParams({}, { dataset: users });
                    $('#borrow').modal('show');
                })
            }

            $scope.chooseUser = function (user) {
                $scope.choosedUser = user;
            }

            $scope.borrow = function(book, user) {
                console.log(book, user);
                
                api.lendBook(book, user)
                .then(function (s) {
                    $('#borrow').modal('hide');
                    console.log(s);
                })
                .catch(function (e) {
                    console.log(e);
                    
                })
            }

            function writeBooks(uid, books) {

                var updates = {};
                books.map(function (b) {
                    var book = {
                        title: b.title,
                        cover: b.cover,
                        ISBN: b.ISBN,
                        lang: b.lang,
                        publisher: b.publisher,
                        genre: b.genre,
                        author: b.author,
                        pages: b.pages,
                        year: b.year,
                        desc: b.desc,
                        starCount: 0
                    }

                    return b;
                });
                firebase.database().ref().update(updates);

            }

            // writeBooks($window.localStorage.getItem('uid'), api.getBooks());
        }])