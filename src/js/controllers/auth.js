angular.module('app')
    .controller('authCtrl', ['$rootScope', '$scope', '$state', '$window', 'api',
        function ($rootScope, $scope, $state, $window, api) {
            $scope.login = function (email, passwd) {                
                firebase.auth()
                    .signInWithEmailAndPassword(email, passwd)
                    .then(function (success) {
                        $window.localStorage.setItem('uid', success.uid);
                        $state.go('app.main');
                    })
                    .catch(function (error) {
                        console.log(error);
                        $scope.$apply(function () {
                            $scope.errorCode = error.code;
                            $scope.errorMessage = error.message;
                        })
                    })
            }

        }])
    .controller('headerCtrl', ['$rootScope', '$scope', '$state', '$window', 'api',
        function ($rootScope, $scope, $state, $window, api) {
            $rootScope.logout = function () {                
                $state.go('appSimple.login');
            }
            api.getNotifications()
            .then(function (notifications) {
                $rootScope.notifications = notifications;
            })

            $scope.isReturnExpired = function (rd) {
                return moment().isAfter(moment(rd));
            }

            $scope.removeNotification = function (notify) {
                api.removeNotification(notify)
            }

            $scope.borrow = function (n) {
                n.book['$id'] = n.bid;
                
                api.lendBook(n.book, n.user)
                .then(function (lended) {
                    api.removeNotification(n)
                })
                .catch(function (e) {
                    console.log(e);
                    
                })
            }

            $scope.extend = function (n) {
                n.lend['$id'] = n.lid;
                
                api.extendLend(n.lend)
                .then(function (lended) {
                    api.removeNotification(n)
                })
                .catch(function (e) {
                    console.log(e);
                    
                })
            }
        }])