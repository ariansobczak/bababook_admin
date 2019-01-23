angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
  $stateProvider
  .state('app.icons', {
    url: "/icons",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Icons'
    }
  })
  .state('app.database', {
    url: "/database",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Database'
    }
  })
  .state('app.database.books', {
    url: '/books',
    templateUrl: 'views/database/books.html',
    ncyBreadcrumb: {
      label: 'Books'
    }
  })  
  .state('app.database.events', {
    url: '/events',
    templateUrl: 'views/database/events.html',
    ncyBreadcrumb: {
      label: 'Events'
    }
  })
  .state('app.database.users', {
    url: '/users',
    templateUrl: 'views/database/users.html',
    ncyBreadcrumb: {
      label: 'Users'
    }
  })
  .state('app.database.groups', {
    url: '/groups',
    templateUrl: 'views/database/groups.html',
    ncyBreadcrumb: {
      label: 'Groups'
    }
  })
}]);
