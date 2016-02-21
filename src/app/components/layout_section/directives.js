angular.module('layoutSectionModule')
	.directive('layoutSection', function() {
		return {
			restrict:'EA',
			templateUrl: baseTemplateDir + 'layoutSection.html',
			transclude:true,
			replace:true,
			scope:{
				section:"="
			},
			link:function(scope, element, attr) {
				$(element[0]).droppable();
				
				$(element[0]).on("drop", function(event, ui) {
					scope.$emit('specio.field-added', scope.section, ui.helper[0].id.replace('field-sample-', ''));
				});

				$(element[0]).find(".grid-stack").gridstack({
					animate:true
				});
			},
			controller: ['$scope', function($scope) {

			}]
		}
	});