angular.module('panelManagerModule')
	.service('panelManagerService', function() {
		var panels = [];
		var _currentPanel = null;
		var _observers = [];
		var _registerCallback

		return {
			currentPanel: function() { return _currentPanel },
			setPanel: function(panelName, model, modelType) {
				var filteredPanel = panels.filter(function(panel) {
					return panel.name === panelName;
				});
				if(filteredPanel !== null) {
					_currentPanel = filteredPanel[0];
					
					if(model) {
						_currentPanel.model = model;
					}
					if(modelType) {
						_currentPanel.modelType = modelType;
					}

					selectPanel(panelName);
					notifyObservers();
				}
			},
			registerPanel: function(panelName, readableName, htmlTemplate) {
				panels.push(new Panel(panelName, readableName, htmlTemplate));
				notifyObservers();
			},
			closePanel: function() {
				_currentPanel = null;
				notifyObservers();
			},
			getPanelNames: function() {
				return panels.map(function(panel) {
					return {
						readableName: panel.readableName,
						name: panel.name
					};
				});
			},
			registerObserver: function(callback) {
				if(callback) {
					_observers.push(callback);
				}
			}
		};

		function notifyObservers(data) {
			for(var i = 0; i < _observers.length; i++) {
				_observers[i](data);
			}
		}

		function selectPanel(panelName) {
			for(var i = 0; i < panels.length; i++) {
				panels[i].selected = false;
			}
			panels.filter(function(panel) { return panel.name === panelName; }).selected = true;
		}

		function Panel(pName, pReadableName, pTemplateUrl) {
			this.name = pName;
			this.readableName = pReadableName;
			this.templateUrl = 'templates/' + pTemplateUrl;
			this.selected = false;
			this.model = null;
		}
	});