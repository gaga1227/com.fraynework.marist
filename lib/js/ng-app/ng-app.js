'use strict';
/* ==========================================================================
   APP
   ========================================================================== */
angular.module('myApp', [
	//official modules
	//'ngTouch',
	'ngRoute',
	'ngAnimate',
	'ngResource',
	//lib modules
	'ng-iscroll',
	'pasvaz.bindonce',
	//custom app modules
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
])

/* ==========================================================================
   RUN
   ========================================================================== */
.run(['$rootScope','$filter', function($rootScope, $filter) {
	//routeChangeStart
	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
		//getting route data
		if (curr.$$route && curr.$$route.resolve) {
			$rootScope.loadingView = true;	
			$rootScope.sectionID = $filter('cleanPath')(curr.$$route.originalPath);
			$rootScope.articleID = curr.params.articleID;
			$rootScope.pageID = curr.params.pageID;
			console.log('e:$routeChangeStart', curr.$$route.originalPath, curr.pathParams);
		}
		//view anim selector
		if (curr && !prev) {
			//home
			$rootScope.viewAnim = 'fade';
		}
		else {
			//default
			$rootScope.viewAnim = 'rtl'; //(curRoute && newRoute && (curRoute.depth > newRoute.depth)) ? 'ltr':'rtl';
		}
	});
	//routeChangeSuccess
	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) { 
		$rootScope.loadingView = false;
		if (curr.$$route) {
			console.log('e:$routeChangeSuccess', curr.$$route.originalPath, curr.pathParams);
		}
	});
}])

/* ==========================================================================
   CONFIG
   ========================================================================== */
.config(['$routeProvider', function($routeProvider) {	
	//resolve functions
	var urlError = '/page/error',
		Resolve = {
			list: function(ListFactory, $rootScope, $location) {
				var promise = ListFactory['query_' + $rootScope.sectionID]().$promise;
				promise.then(function(data) {
					return data;
				}, function(data) {
					$location.path(urlError);
					return data;
				});
				return promise;
			},
			article: function(PageFactory, $rootScope, $location) {
				var promise = PageFactory.getPage($rootScope.articleID);
				promise.then(function(data) {
					return data;
				}, function(data) {
					$location.path(urlError);
					return data;
				});
				return promise;
			},
			page: function(PageFactory, $rootScope, $location) {
				var promise = PageFactory.getPage($rootScope.pageID);
				promise.then(function(data) {
					return data;
				}, function(data) {
					$location.path(urlError);
					return data;
				});
				return promise;
			}
		};
	
	//list
	$routeProvider.when('/events', {
		templateUrl: 'partials/lists.html',
		controller:  'ListsController',
		resolve: {
			entries: Resolve.list
		},
		depth:1
	});
	$routeProvider.when('/programmes', {
		templateUrl: 'partials/list.html', 
		controller:  'ListController',
		resolve: {
			entries: Resolve.list
		},
		depth:1
	});
	$routeProvider.when('/publications', {
		templateUrl: 'partials/list.html', 
		controller:  'ListController',
		resolve: {
			entries: Resolve.list
		},
		depth:1
	});
	$routeProvider.when('/news', {
		templateUrl: 'partials/lists.html',
		controller:  'ListsController',
		resolve: {
			entries: Resolve.list
		},
		depth:1
	});
	$routeProvider.when('/links', {
		templateUrl: 'partials/list.html',
		controller:  'ListController',
		resolve: {
			entries: Resolve.list
		},
		depth:1
	});
	//article
	$routeProvider.when('/article/:articleID', {
		templateUrl: 'partials/article.html', 
		controller:  'ArticleController',
		resolve: {
			article: Resolve.article
		},
		depth:2
	});
	//page
	$routeProvider.when('/page/:pageID', {
		templateUrl: 'partials/page.html', 
		controller:  'PageController',
		resolve: {
			page: Resolve.page
		},
		depth:1
	});
	//menu
	$routeProvider.when('/menu', {
		templateUrl: 'partials/menu.html', 
		controller:  'MenuController',
		depth:10
	});
	//home
	$routeProvider.when('/home', {
		templateUrl: 'partials/home.html', 
		controller:  'HomeController',
		depth:10
	});
	//default
	$routeProvider.otherwise({
		redirectTo:  '/home'
	});
}]);