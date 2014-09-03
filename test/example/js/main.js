/**
 * Created by Sunshine on 9/3/14.
 */
require.config({
    paths: {
        "knockout":"../../../lib/knockoutjs/dist/knockout.debug",
        "jquery": "../../../lib/jquery/dist/jquery",
        "bootstrap": "../../../lib/bootstrap/dist/js/bootstrap"
    },
    shim: {
        "bootstrap": ["jquery"]
    }
})

require(["./ViewModels/TestViewModel","knockout"], function(TestViewModel, ko){
    var viewModel = new TestViewModel();
    ko.applyBindings(viewModel);
});