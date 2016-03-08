angular.module('specBuilder')
	.directive('specBuilder', function(){
		return {
			restrict:'EA',
			// require:'^specio',
			controller: ['$scope','panelManagerService', function($scope, panelManager) {
				$scope.template = new Template();
				$scope.value = "This";

				$scope.fieldList = [
					{
						type:'checkbox',
						html:'<input type="checkbox" disabled="disabled"/>'
					},
					{
						type:'radio',
						html:'<input type="radio" disabled="disabled"/>'
					},
					{
						type:'list',
						html:'<select disabled="disabled" style="height:30px;"></select>'
					}
				];

				panelManager.registerPanel('sectionEditor', 'Edit Section', 'sectionEditPanel.html');
				panelManager.registerPanel('fieldEditor', 'Edit Field', 'fieldEditPanel.html');

				$scope.$on("specio.section-add", function(event, args) {
					
					event.stopPropagation();

					var newSection = new Section($scope.template);

					$scope.template.sections.push(newSection);
					$scope.template.selectSection(newSection);

					$scope.$broadcast("specio.section--selected", newSection);

					panelManager.setPanel('sectionEditor', newSection, 'section');
				});

				$scope.$on("specio.section-delete", function(event, section) {
					var sections = $scope.template.sections.filter(function(sec) { 
						return sec != section;
					});
					
					$scope.template.sections = sections;
				});


				$scope.$on("specio.field-added", function(event, section, fieldtype) {
					if(fieldtype) {
						var newField = new Field(section, fieldtype);
						section.fields.push(newField);
						$scope.$apply();
					}
				});

			}],
			scope: {
				sections:"="
			},
			transclude:true,
			templateUrl: baseTemplateDir + 'specBuilder.html'
		};
	});