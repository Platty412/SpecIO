//COMPONENT: Panel
(function(w){

    //Html snippets to be inserted based on option data.

    // {
    //     absolute: true,
    //     title:'',
    //     content: '',
    //     classes: [],
    //     rounded:true,
    //     openHandler: function(){},
    //     closeHandler:function(){},
        
    // }


    w.PanelManager = function(container) {
        var panels = [];
        var self = this;
        var panelMax = 5;
        var maxPanelWidth = window.outerWidth;
        var panelOverlay = $("<div class='panel--overlay'></div>");
        var $container = $(container || "body");
        init();

        function init() {
            self.panels = panels;

            //$container.append(panelOverlay);

        }

        /*
            name: addPanel
            arguments: content - the HTML content that will be put into the panel
                       options - a Javascript object with various options for the Panel Module
            returns: integer that corresponds to the index of the panel being created.
        */
        this.addPanel = function(content, options) {
            
            if(options.useOverlay !== false) {
                    if(panels.length === 0) {
                    // var newOverlay = panelOverlay.clone();
                    
                    if(options.closeOnOverlay !== false) {
                        panelOverlay.click(function(e) {
                            e.preventDefault();
                            if(e.stopPropogation) { e.stopPropogation(); }
                            //Activate closing of panel based on click initiated from overlay (part of Panel Manager)
                            var panel = getTopPanel();
                            panel.close();
                        });
                    }

                    $container.append(panelOverlay);
                    panelOverlay.fadeIn();
                }
            }

            //Set container to append content to.
            options.container = $container;


            if(!options.width) {
                var panelDiff = panels.length - 1 > panelMax ? panelMax : panels.length - 1;

                if(panelDiff < 0) { panelDiff = 0; }

                var _containerMarginLeft = parseInt($container.css("margin-left").replace("px",""));
                var _containerMarginRight = parseInt($container.css("margin-right").replace("px",""));

                var panelWidth = 
                    (($container.width() - _containerMarginLeft + _containerMarginRight) //Calculate the total width minus the magins of the container specified
                    - (panelDiff*100)); //For every panel up to the max, take away a percent of the total allowed to do stacking effect

                options.width = panelWidth;
            }

            clearPanelManagerSettings(options);

            var newPanel = new Panel(content, clearPanelManagerSettings(options), self);
            panels.push(newPanel);

            return newPanel;
        }

        function getTopPanel() {
            return panels[panels.length-1];
        }

        this.clearPanels = function() {
            //TODO: investigate potential memory leak here
            for(var i = 0; i < panels.length; i++) {
                panels[i].close();
            }
        }

        this.removePanel = function() {
            // panels = panels.filter(function(element, ind) {
            //     return element != panel;
            // });

            var panel = panels.pop();
            if(panels.length === 0) {
                panelOverlay.fadeOut();
                panelOverlay.remove();
            }

            return panel;
        }

        function clearPanelManagerSettings(options) {
            if(options.closeOnOverlay)
                delete options.closeOnOverlay;
            if(options.useOverlay)
                delete options.useOverlay;
            return options;
        }

        function Panel(content, options, panelManager) {
        
            //Private variables
            var panel = $("<div class='panel'></div>");
            var panelClose = $("<div class='panel--close'>X</div>");
            var panelBody = $('<div class="panel--body"></div>');
            
            var firstOpen = true;
            var isOpen = false;
            var _classList;
            var _opts;

            var _PanelManager = panelManager;

            var _panelSelf = this;

            //Public variables

            init();

            //Private functions
            function init() {
                setOptions();
                assemble();
            }

            function setOptions() {
                if(!options) {
                    _opts = {};
                } else {
                    _opts = options;
                }

                _opts.content = content;

                _classList = _opts.classes || [];
            }

            function assemble() {
                for(var i = 0; i < _classList.length; i++) {
                    panel.addClass(_classList[i]);
                }

                panelBody.append(_opts.content);

                if(_opts.width) {
                    panel.width(_opts.width);
                }

                panel.append(panelBody);
                panel.append(panelClose);
            }

            function attachHandlers() {
                //Handlers for opening the panel
                if(_opts.openHandler) {
                    $(_opts.openHandler).click(open);
                }
                //Handlers for closing the panel
                if(_opts.closeable !== false) {
                    if(_opts.closeHandler) {
                        $(_opts.closeHandler).click(close);
                    }
                    panelClose.click(close);
                }
            }

            //Functions to later be turned public
            function open() {
                firstOpen = false;

                if(isOpen) {
                    return;
                }

                attachHandlers();
                append();

                switch(_opts.effect) {
                    default:
                    case "fade":
                        panel.fadeIn(function(){
                            onload();
                        });
                        break;
                    case "slide":
                        panel.slideDown(function () {
                            onload();
                        });
                        break;
                    case "show":
                        panel.show();
                        onload();
                        break;
                }

                isOpen = true;
            }

            function onload() {
                if(_opts.onload) {
                    if(typeof _opts.onload == "function") {
                        _opts.onload();
                    }
                }
            }

            function append() {
                _opts.container.append(panel);
            }

            function close(e) {
                if(!isOpen) {
                    return;
                }

                if(typeof e !== "undefined") {
                    if(e.target !== e.currentTarget) {
                        return;
                    }
                }

                if(typeof _opts.beforeclose === "function"){
                    _opts.beforeclose();
                }

                switch(_opts.effect) {
                    case "fade":
                        panel.fadeOut(function(){
                            onclose();
                        });
                        break;
                    default:
                    case "slide":
                        panel.slideUp(function(){
                            onclose();
                        });
                        break;
                    case "show":
                        panel.hide();
                        onclose();
                        break;
                }

                isOpen = false;

                remove();
            }

            function remove() {
                panel.remove();
                //Call to Panel Manager's private function to remove panel
                _PanelManager.removePanel();
            }

            function onclose() {
                if(_opts.onclose) {
                    if(typeof _opts.onclose == "function") {
                        _opts.onclose();
                    }
                }
            }

            function beforeclose() {
                if(_opts.beforeclose) {
                    if(typeof _opts.beforeclose == "function") {
                        _opts.beforeclose();
                    }
                }
            }

            function html() {
                return panel;
            }
            
            //Models
            var Panel = function () {
                this.options = _opts;
            };

            Panel.prototype.close = close;
            Panel.prototype.open = open;
            Panel.prototype.$ = html;

            if(firstOpen && !_opts.openHandler) {
                if(_opts.suppressOpen !== true) {
                    open();
                }
            } else {
                attachHandlers();
            }

            //Return portion
            return new Panel();
        };
    }
})(window);