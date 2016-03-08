angular.module('specio')
	.controller('specioInterface', ['$scope', 'panelManagerService', function($scope,panelManager) {
		$scope.panels = panelManager.getPanelNames();

		panelManager.registerObserver(function() {
			$scope.panels = panelManager.getPanelNames();
		});
		
		$scope.selectPanel = function(panel) {
			panelManager.setPanel(panel);
		}
	}]);