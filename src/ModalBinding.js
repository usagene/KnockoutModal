define(["./core/KOBindingWrapper", "knockout", "bootstrap"], function(BindingWrapper, ko){
   function ModalBindingHandler($element, valueAccessor){
       var that = this, $dialog = null;
       this.$dialogHolder = null;
       this.$element = $element;
       this.binder = null;

       this.clearDialog = function(){
           // clear the dialog region
           if($dialog){
               ko.cleanNode($dialog[0]);
               $dialog.empty();
               $dialog.remove();
               $dialog = null;
           }
       };

       this.init = function(showModal, allBindings, viewModel){
            // any initialization logic
           // any initialization logic
           if (allBindings && allBindings.dialogHolderSelector) {
               this.$dialogHolder = $(allBindings.dialogHolderSelector);
           }
       };

       this.update = function(showModal,allBindings, viewModel){
           if (showModal && allBindings.binder) {
               this.binder = allBindings.binder;
               this.binder.applyBindings(that.$element).done(function () {
                   $dialog = $(".modal", that.$element[0]);
                   $dialog.appendTo(that.$dialogHolder || document.body).modal("show");

                   $dialog.on("hidden.bs.modal", function () {
                       that.binder.disposeChildren();

                       that.clearDialog();

                       // update view model with modal hidden state, no else block, don't think the valueAccessor can be a direct value here
                       if (ko.observable(valueAccessor())) {
                           valueAccessor()(false);
                       }
                   });
               });
           } else if (!showModal) {
               if ($dialog) {
                   $dialog.modal("hide");
                   $dialog = null;
               }
           }
       };

       this.dispose = function(){
           this.$dialogHolder = null;

           if (this.binder && this.binder.dispose) {
               this.binder.dispose();
           }

           this.clearDialog();

           this.binder = null;
           this.$element = null;
           that = null;
       }
   }

    ko.bindingHandlers.modal = new BindingWrapper(ModalBindingHandler);

});
