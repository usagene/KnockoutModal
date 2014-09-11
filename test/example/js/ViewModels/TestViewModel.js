/**
 * Created by Sunshine on 9/3/14.
 */
define(['knockout', '../../../../src/core/ViewBinder', 'Models/Dialog'], function(ko,ViewBinder, model){
    function TestViewModel(){
        this.show = ko.observable(false);

        this.showTestDialog = function(){
          this.show(true);
        };

        this.binder = new ViewBinder("text!../dialogs/TestDialog.html", "ViewModels/DialogViewModel", model);
    }

    return TestViewModel;
});