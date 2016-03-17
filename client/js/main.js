var app = angular.module('myApp', ["ngRoute"]);

	app.controller('MyController', ['$scope', "$location", "$rootScope", function($scope, $location, $rootScope){
        $scope.name = "";
       
        $scope.userName = function(name) {
            $rootScope.name = name;
            console.log(name);
            $location.path("/tweets");
        }    
	}]);
    
    app.controller("tweetController", ["$scope", "$http", "$filter", "$rootScope", function($scope, $http, $filter, $rootScope) {
        $http({
            url: "http://localhost:3000/messages",
            type: "GET",
        }).then(function(success) {
            console.log(success);
            $scope.tweets = success.data;
            console.log($scope.tweets);
            
        });
        $scope.newTweet =  function(tweet) {
            console.log(tweet);
            console.log($scope.tweets);
            $scope.time = $filter("date")(new Date(), "medium");
            console.log($scope.time);
            $scope.newMessage = {text: tweet, user: $rootScope.name};
            console.log($scope.newMessage);
            
            $scope.tweets.push($scope.newMessage);
            console.log("good so far");
            console.log($scope.tweets);
            $http({
            url: "http://localhost:3000/messages",
            type: "POST",
            data: $scope.newMessage
            }).then(function(success) {
            console.log(success);
            
        });
            
        }
        
    }]);
    
	app.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: "views/welcome.html",
            controller: "MyController"
        })
        .when("/tweets", {
            templateUrl: "views/tweets.html",
            controller: "tweetController"
        })

}]);