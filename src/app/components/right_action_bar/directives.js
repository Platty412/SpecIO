angular.module("actionBar")
	.directive("actionBar", function() {
		return {
			require:'^specio',
			restrict:'EA',
			templateUrl:'templates/sideBar.html',
			scope:{

			},
			controller:['$scope' , function($scope){
				$scope.actions = [];
				$scope.actions.push(new ActionItem("A"));
				$scope.actions.push(new ActionItem("B"));
				$scope.actions.push(new ActionItem("C"));
				$scope.actions.push(new ActionItem("D"));
			}]
		};
	});