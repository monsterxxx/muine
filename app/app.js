'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.version',
  'psApp.services.experiment',
  'psApp.navbar'
])
.config(function ($urlRouterProvider) {
  // if the path doesn't match any of the urls you configured
  // otherwise will take care of routing the user to the
  // specified url
  $urlRouterProvider.otherwise('/view1');
});
