'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngSanitize'])

/* section */
.controller('SectionController', ['$scope', '$routeParams', 
function($scope, $routeParams) {
	
	$scope.sectionID = $routeParams.sectionID;
	$scope.categoryID = $routeParams.categoryID;
	
}])

/* article */
.controller('ArticleController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	
	$scope.sectionID = $routeParams.sectionID;
	$scope.articleID = $routeParams.articleID;
	
}])

/* page */
.controller('PageController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	
	$scope.pageID = $routeParams.pageID;
	
}])

/* menu */
.controller('MenuController', ['$scope', '$routeParams',
function($scope, $routeParams) {

}]);