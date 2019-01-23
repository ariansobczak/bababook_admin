// Default colors
var brandPrimary = '#20a8d8';
var brandSuccess = '#4dbd74';
var brandInfo = '#63c2de';
var brandWarning = '#f8cb00';
var brandDanger = '#f86c6b';
var mintColor = '#00C49E';

var grayDark = '#2a2c36';
var gray = '#55595c';
var grayLight = '#818a91';
var grayLighter = '#d1d4d7';
var grayLightest = '#f8f9fa';

angular
  .module('app', [
    'ui.router',
    'oc.lazyLoad',
    'ncy-angular-breadcrumb',
    'angular-loading-bar',
    'ngTable',
    'firebase',
    'firebaseConfig',
    'angular-rating-icons',
    'ui.select',
    'ngSanitize',
    'ui.calendar'
  ])
  .factory('config', [function () {
    return {
        lendTime: 14,
        extendLendTime: 7 
    }
  }])
  .factory('notificationTemplates', [function () {
    return {
        returnLend: function(lend) {
          return {
            title: `Return book ${lend.book.title}`,
            message: `Retrun date of your book was expired ${moment.duration(moment(lend.returnDate).diff(moment(), 'days'), 'days').humanize()}. Please return your book`
        }
      }
    }
  }])
  .constant('uiSelectConfig', {
    theme: 'bootstrap',
    searchEnabled: true,
    sortable: false,
    placeholder: '', // Empty by default, like HTML tag <select>
    refreshDelay: 1000, // In milliseconds
    closeOnSelect: true,
    skipFocusser: false,
    dropdownPosition: 'auto',
    removeSelected: true,
    resetSearchInput: true,
    generateId: function() {
      // return latestId++;
    },
    appendToBody: false,
    spinnerEnabled: false,
    spinnerClass: 'glyphicon glyphicon-refresh ui-select-spin',
    backspaceReset: true
  })
  .config(['cfpLoadingBarProvider', '$sceDelegateProvider', function (cfpLoadingBarProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', '*']);
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 1;
  }])
  .run(['$rootScope', '$state', '$stateParams', 'ngTableDefaults', '$window',
  function ($rootScope, $state, $stateParams, ngTableDefaults, $window) {
    $rootScope.$on('$stateChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $rootScope.$state = $state;

    // ngTableDefaults.params.count = 5;
    ngTableDefaults.settings.counts = [];

    $window.fbAsyncInit = function() {
      FB.init({
        appId      : '180052556272819',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
        
      FB.AppEvents.logPageView();   
        
    };

    return $rootScope.$stateParams = $stateParams;
  }]);
