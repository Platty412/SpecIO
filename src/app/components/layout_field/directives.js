angular.module('layoutFieldModule')
	.directive('layoutField', function() {
		return {
			templateUrl: baseTemplateDir + 'template.html',
			replace:true,
			scope:{
				field:"="
			},
			link:function(scope, element, attr) {
				var grid = $(element[0]).closest(".grid-stack").data("gridstack");
				grid.makeWidget(element[0]);
			}
		};
	});