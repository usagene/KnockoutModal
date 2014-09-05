/**
 * Created by Sunshine on 9/3/14.
 */
require.config({
    paths: {
        "knockout":"../../../lib/knockoutjs/dist/knockout.debug",
        "jquery": "../../../lib/jquery/dist/jquery",
        "bootstrap": "../../../lib/bootstrap/dist/js/bootstrap",
        "jqueryui": "../../../lib/jqueryui/jquery-ui",
        "text": "../../../lib/requirejs-text/text",
        "komapping": "../../../lib/knockout-mapping/knockout.mapping"
    },
    shim: {
        "bootstrap": ["jquery"]
    }
});

require(["./ViewModels/TestViewModel","knockout", "../../../src/ModalBinding"], function(TestViewModel, ko){
    var viewModel = new TestViewModel();
    ko.applyBindings(viewModel);
});