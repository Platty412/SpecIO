angular.module('builderLayoutModule')
	.directive('builderLayout', function(){
		return {
			require:'^specBuilder',
			restrict:'EA',
			templateUrl: baseTemplateDir + 'builderLayout.html',
			controller: ['$scope', function($scope) {
				
			}],
			scope: {
				sections:"="
			}
		}
	});