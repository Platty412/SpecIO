angular.module('sectionPanelModule')
	.directive('sectionPanel', function(){
		return {
			restrict:"E",
			transclude:true,
			replace:true,
			link:function(scope, element, thing) {

			},
			templateUrl: baseTemplateDir + 'panel.html'
		};
	});