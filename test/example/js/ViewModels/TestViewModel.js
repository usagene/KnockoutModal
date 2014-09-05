/**
 * Created by Sunshine on 9/3/14.
 */
define(['knockout', '../../../../src/core/ViewBinder'], function(ko,ViewBinder){
    function TestViewModel(){
        this.show = ko.observable(false);

        this.showTestDialog = function(){
          this.show(true);
        };

        this.binder = new ViewBinder("text!../dialogs/TestDialog.html", "ViewModels/DialogViewModel", "Models/Dialog");
    }

    return TestViewModel;
});