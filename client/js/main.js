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
            method: "GET",
        }).then(function(success) {

            $scope.tweets = success.data;

            
        });
        $scope.newTweet =  function(tweet) {

            $scope.time = $filter("date")(new Date(), "medium");

            $scope.newMessage = {text: tweet, user: $rootScope.name};
            
            $scope.tweets.push($scope.newMessage);

            $http({
                url: "http://localhost:3000/messages",
                method: "POST",
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