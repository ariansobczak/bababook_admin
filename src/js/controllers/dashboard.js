angular.module('app')
.controller('dashCtrl', ['$scope', 'NgTableParams', 'config', 'api', 'notificationTemplates', function ($scope, NgTableParams, config, api, notificationTemplates) {
    api.getLendedBooks().then(function (lended) {
        
        lended.map(function (l) {
            l['percent'] = 100 - ($scope.calculateDays(l.returnDate) / config.lendTime) * 100;
            return l;
        })
        $scope.lended = lended;
        // $scope.lended = new NgTableParams({}, { dataset: lended });
    })

    $scope.returnUntil = function (rd) {
        return moment(rd).fromNow();
    }

    $scope.returnBook = function (lend) {
        api.returnLend(lend)
        .then(function (lended) {
            // $scope.lended = new NgTableParams({}, { dataset: lended });
        })
        .catch(function (e) {
            console.log(e);
            
        })
    }

    $scope.extend = function (lend) {
        api.extendLend(lend)
        .then(function (lended) {
            // $scope.lended = new NgTableParams({}, { dataset: lended });
        })
        .catch(function (e) {
            console.log(e);
            
        })
    }

    $scope.sendNotification = function (lend) {
        api.sendNotification(lend, notificationTemplates.returnLend(lend))
        .then(function (lended) {
            console.log('Notification sended');
            // $scope.lended = new NgTableParams({}, { dataset: lended });
        })
        .catch(function (e) {
            console.log(e);
            
        })
    }

    $scope.calculateDays = function (rd) {
        return moment(rd).diff(moment(), 'days');
    }

    $scope.isReturnExpired = function (rd) {
        return moment().isAfter(moment(rd));
    }
    // $scope.users = api.getUsers();
}])