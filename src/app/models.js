var Template = function() {
    var self = this;
    self.id = null;
    self.name = null;
    self.description = null;
    self.revision = null;
    self.created_date = null;
    self.created_by = null;
    self.sections = [];
};

Template.prototype.selectSection = function(section) {
    for(var i = 0; i < this.sections.length - 1; i++) {
        this.sections[i].selected = false;
    }
    section.selected = true;
};

var Spec = function(template) {
    var self=this;
    self.prototype = Template;
    self.roles = null;
    self.approved = null;
    self.template = template;
};

var Section = function(template) {
    var self = this;
    self.id = null;
    self.title = "";
    self.order = 0;
    self.template_id = null;
    self.fields = [];
    self.selected = false;
    self.template = template;
};

//Abstract function. DO NOT IMPLEMENT!!!
var abField = function() {
    var self = this;
    self.id = null;
    self.section_id = null;
    self.title = null;
    self.order = null;
    self.xpos = null;
    self.ypos = null;
    self.height = null;
    self.width = null;
    self.type = null;
};


//To be derived from
var Widget = function() {
    var self = this;
    self.prototype = iField;
};

var Field = function(section, type) {
    var self = this;
    self.prototype = abField;
    self.id = null;
    self.section_id = null;
    self.title = null;
    self.order = null;
    self.xpos = null;
    self.ypos = null;
    self.height = null;
    self.width = null;
    self.type = type;
    self.list = [];
    self.value = [];
    self.required = null;
    self.list_id = null;
    self.attachment_id = null;
    self.section = section;
};