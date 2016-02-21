angular.module('sectionList')
	.directive('builderSectionList',function(){
		return {
			require:'^specBuilder',
			restrict:'EA',
			templateUrl: baseTemplateDir + 'sectionList.html',
			controller: ['$scope', function($scope){

				$scope.addSection = function() {
					$scope.$emit("specio.section-add");
				};

				$scope.selectSection = function(section) {
					$scope.$emit("specio.section-selected");
				}

				$scope.deleteSection = function(section) {
					$scope.$emit("specio.section-delete", section);
				}
			}],
			link: function(scope, element, attrs) {
				$(element[0]).find("ul").sortable({
					stop:function() {
						
					}
				});
			},
			scope: {
				sections:"="
			}
		};
	});