angular.module('app')
.controller('groupsCtrl', ['$scope', 'uiSelectConfig', 'api', function ($scope, uiSelectConfig, api) {
    api.getUsers().then(function (users) {
        $scope.group = users;

    });
    $scope.itemArray = [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
        {id: 4, name: 'fourth'},
        {id: 5, name: 'fifth'},
    ];

    $scope.selectedItem = [$scope.itemArray[0],$scope.itemArray[2]];
}])