angular.module('gridsterModule')
	.directive('gridster', function() {
		return {
			restrict:"A",
			link: function(scope, element, attr) {
				$(element[0]).closest('')
			}
		};
	});