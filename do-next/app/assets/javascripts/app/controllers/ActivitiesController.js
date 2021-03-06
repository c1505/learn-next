angular.module('app')
  .controller('ActivitiesController',function ($scope, ActivitiesService, $http, activities) {

  $scope.data = activities.data;
  $scope.updated = false;
  $scope.update = function(activity) {
    ActivitiesService.update(activity).success(function(response){
      $scope.updated = true;
      $scope.updatedName = response.name;
    });
  };
  $scope.delete = function(activity) {
    ActivitiesService.delete(activity).success(function(){
      $scope.data.splice( $scope.data.indexOf(activity), 1);
    });
  };

  $scope.create= function() {
    ActivitiesService.create($scope.new).success(function(response){
      $scope.data.push(response);
      $scope.createName = response.name;
      $scope.created = true;
      $scope.new = '';
    });
  };

  $scope.sortField = 'min_time';

  $scope.choose = function() {
    $scope.picked = [];
    var count = 0;
    var indexArray = [];
    do {
      count ++;

      do { // finds a random index.  checks if that index is already in indexArray.  if it is, the loop continues.  
        var index = randomIndex($scope.data);
        inArray = indexArray.find(function(number){return number == this}, index); //returns true or false if 
      } while (inArray);

      indexArray.push(index); //adds the random index to numarray

      addPassingActivity(index);
    } while ( ($scope.picked.length < 3) && (count < 100 ) );

    if ($scope.picked.length == 0) {
      alert("no matches found.  try again");
    }
    $scope.pickedInput = "";
  };

  function randomIndex(array) {
    return Math.floor( (Math.random() * (array.length)) + 0 );
  }

  function addPassingActivity(index) {
    if ( ($scope.data[index].min_time < $scope.pickedInput.time) && ($scope.data[index].home == $scope.pickedInput.home) ) {
      $scope.picked.push($scope.data[index]);
    }
  }

  });