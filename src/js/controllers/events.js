angular.module('app')
  .controller('eventsCtrl', ['$scope', '$window', 'NgTableParams', '$firebaseArray', 'api',
    function ($scope, $window, NgTableParams, $firebaseArray, api) {
      // api.getUsers().then(function (users) {
        api.getEvents().then(function (events) {
          $scope.events = events;
          // for (let index = 0; index < 5; index++) {
          //   $scope.events.push($scope.events[0])
          //   $scope.events[index].participates = users;
          //   $scope.events[index].color = mintColor;
          // }
          $scope.uiConfig = {
            calendar: {
              height: 600,
              editable: true,
              theme: 'bootstrap4',
              themeButtonIcons: {
                close: 'fa-times',
                prev: 'fa-chevron-left',
                next: 'fa-chevron-right',
                prevYear: 'fa-angle-double-left',
                nextYear: 'fa-angle-double-right'
              },
              header: {
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
              },
              selectable: false,
              eventClick: $scope.alertEventOnClick,
              eventDrop: $scope.alertOnDrop,
              eventResize: $scope.alertOnResize,
              events: $scope.events,
              eventLimit: 3,
              dayClick: function (startDate) {
                $scope.addEventModal('dayClick', startDate.toDate());
              },
              select: function (startDate, endDate) {
                $scope.addEventModal('selected', startDate.toDate(), endDate.toDate());
              },
              eventClick: function (calEvent, jsEvent, view) {

                alert('Event: ' + calEvent.title);
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                alert('View: ' + view.name);

              }
            }
          };

          // })
        // })
      })

      $scope.addEventModal = function (type, startDate, endDate) {
        $scope.event['startDate'] = startDate || moment().toDate();
        $scope.event['isEnd'] = endDate ? true : false;
        if (endDate && type == 'selected') {
          $scope.event['endDate'] = endDate;
        }
        $('#addEventModal').modal('show');
      };
      $scope.moment = moment;
      $scope.addEvent = function (form) {

        api.addEvent(form);
        // api.addEvent({
        //   title: "dg",
        //   desc: "jhgjg",
        //   startDate: '',
        //   startTime: null,
        //   endDate: '',
        //   endTime: '',
        //   entireDay: true,
        //   isEnd: false,
        //   location: "dfgdfg",
        //   cover: "dfgdfg",
        // })

        $('#addEventModal').modal('hide');
        
        form.$setPristine();
        form.$setUntouched();
        $scope.event = {};

      };
      /* remove event */
      $scope.remove = function (index) {
        $scope.events.splice(index, 1);
      };
      // writeBooks($window.localStorage.getItem('uid'), api.getBooks());

    }])