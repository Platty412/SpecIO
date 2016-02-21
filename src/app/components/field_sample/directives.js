angular.module('fieldSampleModule')
	.directive('fieldSample', function(){
		return {
			require:"^specBuilder",
			restrict:"EA",
			link:function(scope, element, thing) {
				$(element[0]).draggable({
					revert:true,
					handle:'.field-sample-handle'
				});
			},
			scope:{
				type:"@fieldtype"
			},
			transclude:true,
			replace:true,
			templateUrl: baseTemplateDir + 'fieldSample.html'
		};
	});