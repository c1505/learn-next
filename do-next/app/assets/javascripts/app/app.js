angular
  .module('app', ['ui.router', 'templates', 'ngResource'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('top', {
        url: '/top',
        templateUrl: "posts.html",
        controller: "TopController"
      })
      .state('pages', {
        url: '/pages/:id',
        templateUrl: 'posts.html',
        controller: "PagesController as pages",
        resolve: {
          pages: function(BasicService, $stateParams) {
            return {params: $stateParams.id};
          }
        }
      })
      .state('post', {
        url: '/post/:id',
        templateUrl: 'post.html',
        controller: "OtherController as post",
        resolve: {
          post: function(BasicService, $stateParams) {
            return BasicService.story($stateParams.id);
          }
        }
      })
      .state('activities', {
        url: '/activities',
        templateUrl: 'activities.html',
        controller: "ActivitiesController"
      })
      .state('picker', {
        url: '/picker',
        templateUrl: 'picker.html',
        controller: "HomeController"
      })
      .state('home.item', {

      })
      .state('activities.item', {
      })
      .state('discover', {
        url: '/discover',
        templateUrl: 'discover.html'
      })
      .state('complete', {
        url: '/completes/:id',
        templateUrl: 'complete.html',
        controller: 'CompleteController as complete',
        resolve: {
          complete: function ($http, $stateParams) {
            return $http.get('/activities/' + $stateParams.id)
          }
        }
      })
  });