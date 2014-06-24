var jsdom = require("jsdom").jsdom;
GLOBAL.document = jsdom("<html><head></head><body></body></html>");
GLOBAL.window = document.parentWindow;
document.implementation.createHTMLDocument = jsdom;

require("stik-core.js");
require("../src/setup");
require("../src/boundary_lab");
require("../src/behavior_lab");
require("../src/controller_lab");
require("../src/helper_lab");

var stik = window.stik;
