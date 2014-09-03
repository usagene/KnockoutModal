/**
 * Created by Sunshine on 9/3/14.
 */
define(['knockout', '../../../../src/ViewBinder'], function(ko,ViewBinder){
    function TestViewModel(){
        this.show = ko.observable(false);

        this.showTestDialog = function(){
          this.show(true);
        };

        this.binder = new ViewBinder("../dialogs/TestDialog.html", "ViewModels/DialogViewModel", "Modals/Dialog");
    }

    return TestViewModel;
});