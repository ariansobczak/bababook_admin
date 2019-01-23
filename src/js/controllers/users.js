angular.module('app')
.controller('usersCtrl', ['$scope', 'NgTableParams', 'api', function ($scope, NgTableParams, api) {
    api.getUsers().then(function (users) {
        $scope.users = new NgTableParams({}, {
                dataset: users
            });
    })

    $scope.moment = moment;
}])