var Template = function() {
    var self = this;
    self.id = ko.observable(null);
    self.name = ko.observable(null);
    self.description = ko.observable(null);
    self.revision = ko.observable(null);
    self.created_date = ko.observable(null);
    self.created_by = ko.observable(null);
    self.sections = ko.observableArray([]);
};

var Spec = function() {
    var self=this;
    self.prototype = Template;
    self.roles = ko.observable(null);
    self.approved = ko.observable(null);
};

var Section = function(template) {
    var self = this;
    self.$identifier = 0;
    self.id = ko.observable(null);
    self.title = ko.observable("[Title]");
    self.order = ko.observable(0);
    self.template_id = ko.observable(null);
    self.fields = ko.observableArray([]);
    self.selected = ko.observable(false);
    self.template = template;
};

//Abstract function. DO NOT IMPLEMENT!!!
var abField = function() {
    var self = this;
    self.id = ko.observable(null);
    self.section_id = ko.observable(null);
    self.title = ko.observable(null);
    self.order = ko.observable(null);
    self.xpos = ko.observable(null);
    self.ypos = ko.observable(null);
    self.height = ko.observable(null);
    self.width = ko.observable(null);
    self.type = ko.observable(null);
};


//To be derived from
var Widget = function() {
    var self = this;
    self.prototype = iField;
};

var Field = function() {
    var self = this;
    self.prototype = abField;
    self.id = ko.observable(null);
    self.section_id = ko.observable(null);
    self.title = ko.observable(null);
    self.order = ko.observable(null);
    self.xpos = ko.observable(null);
    self.ypos = ko.observable(null);
    self.height = ko.observable(null);
    self.width = ko.observable(null);
    self.type = ko.observable(null);
    self.list = ko.observableArray([]);
    self.value = ko.observableArray([]);
    self.required = ko.observable(null);
    self.list_id = ko.observable(null);
    self.attachment_id = ko.observable(null);
};


function setSortOrder(items) {
    for(var i = 0; i < items.length; i++) {
        items[i].order = i;
    }
}

function ViewModel(PanelManager) {
    this.pm = new PanelManager("#template-edit .formbuilder");
    this.Specbuilder = new Specbuilder(".specbuilder", this.pm, new UnitRenderer());
    this.Specbuilder.loadTemplate(new Template());
}

function Specbuilder(context, panelManager, UnitRenderer) {
    //this.template = template;
    $context = $(context || "body");
    var panels = [];
    var self = this;
    var components = {};
    var _template = ko.observable(null);

    this.loadTemplate = function(template) {
        _template(template);
        init();
    }

    this.getSectionDOMElements = function() {
        return $context.find(".section");
    };

    function init() {
        ko.applyBindings(_template, $context[0]);
        registerEventHandlers();
        initializeComponents();
    };

    function initializeComponents() {
        components["fieldBar"] = new FieldBar($context.find(".new-field-bar"));
        components["nav"] = new SpecbuilderNav($context.find(".section-handler"));
        components["main"] = new SpecbuilderMain($context.find(".formbuilder"), _template, UnitRenderer);
        components["sectionBuilder"] = new SectionEditor(panelManager, UnitRenderer);
    }

    function registerEventHandlers() {
        //Register event handler for a section being selected and define custom behavior for that event
        $context.on("specio.section-added", $context, function(event, section) {
            components["main"].addSection(section);
        });

        $context.on("specio.section-selected",$context, function(event, section) {
            components["sectionBuilder"].edit(section);
            components["main"].selectSection(section);
            components["nav"].selectSection(section);
        });
    }
}

function SpecbuilderNav(context) {
    var $context = $(context);

    this.selectSection = function(section) {
        section.template.selectSection(section);
    };
}

function SpecbuilderMain(context, template, UnitRenderer) {
    var $context = $(context);

    var sectionDOMArray = [];

    this.addSection = function(section) {
        var $section = UnitRenderer.getUnit("section");
        console.log("Add Section");
        console.log(section);
        sectionDOMArray[section.$identifier] = $section;
    }

    this.selectSection = function(section) {
        var sectionIdentifiers = section.template.getSectionIdentifiers();
        //slide up every other section
        _.each(sectionDOMArray,function(value, key){
            value.slideUp();
        });
        //slide down the selected section
        sectionDOMArray[section.$identifier].slideDown();
    };

    (function(){

    })();

    function initializeEventHandlers() {

    }
}

function SectionEditor(panelManager, UnitRenderer) {
    var $sectionEditor = UnitRenderer.getUnit("section-panel");
    var _section = ko.observable(null);
    var panel = panelManager.addPanel($sectionEditor, {
        width: 500,
        closeOnOverlay:false,
        useOverlay:false,
        onload: function() {
            ko.applyBindings(_section, $sectionEditor[0]);
        },
        suppressOpen:true
    });

    this.edit = function(section) {
        _section(section);
        panel.open();
        $sectionEditor.find(".section-title").select();
    }
}

function UnitRenderer(unitHolderSelector) {
    var $unitHolder = $(unitHolderSelector || ".unit-holder");

    this.getUnit = function(unitName) {
        var unit = $unitHolder.find("#"+unitName + "-template").clone();
        //append new classname without the -template suffix.
        unit.attr("ID", "#" + unitName);

        return unit;
    };
}

function FieldBar(context) {
    var $context = $(context || "body");
    //Initialization function
    (function() {
        makeSamplesDraggable();
    })();

    function makeSamplesDraggable() {
        if(typeof $("body").draggable !== "function") {
            throw new Error("draggable funcitonality not available for field sample bar");
        }

        $context.children().each(function(index) {
            $(this).draggable({ revert: true, handle:'.new-field--handle' });
        });
    }

}

var vm;

$(function() {
    vm = new ViewModel(PanelManager);
});

