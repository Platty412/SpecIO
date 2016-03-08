angular.module('panelManagerModule')
	.directive('panelManager', function(){
		return {
			restrict:"E",
			link:function(scope, element, attrs) {

			},
			controller: ["$scope", "panelManagerService", function($scope, panelManagerSvc) {
				$scope.currentPanel = null;

				$scope.closePanel = function() {
					panelManagerSvc.closePanel();
				};

				panelManagerSvc.registerObserver(function() {
					var currentPanel = panelManagerSvc.currentPanel();
					$scope.currentPanel = currentPanel;
					if(currentPanel !== null) {
						$scope[currentPanel.modelType] = currentPanel.model;
						console.log(currentPanel.model);
					}
				});
			}],
			replace:true,
			templateUrl: baseTemplateDir + 'panelManager.html'
		};
	});