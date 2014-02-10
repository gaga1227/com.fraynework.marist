'use strict';

/* Filters */

angular.module('myApp.filters', [])

.filter('interpolate', ['version', function(version) {
	return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	}
}])

.filter('capitalize', [function() {
	return function(input, param) {
		return input.substring(0,1).toUpperCase()+input.substring(1);
	}
}])

.filter('cleanPath', [function() {
	return function(input, param) {
		var parts = input.split('/'),
			newParts = parts.filter(function(v){return v!==''});
		return newParts[0];
	}
}]);
