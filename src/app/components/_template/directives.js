angular.module('sectionPanelModule')
	.directive('sectionPanel', function(){
		return {
			restrict:"E",
			link:function(scope, element, thing) {

			},
			templateUrl: baseTemplateDir + 'replaceThis.html'
		};
	});