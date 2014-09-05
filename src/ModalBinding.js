define(["./core/KOBindingWrapper", "knockout", "bootstrap"], function(BindingWrapper, ko){
   function Modal($element){
       var that = this;
       this.$element = $element;

       this.init = function(showModal, allBindings, viewModel){
            // any initialization logic
       };

       this.update = function(showModal,allBindings, viewModel){
           var $dialog = null;

           if(showModal && allBindings.binder){
               allBindings.binder.applyBindings(that.$element).done(function(){
                       $dialog = $(".modal", that.$element[0]);
                       $dialog.modal("show");

                        $dialog.on("hidden", function(){
                            //allBindings.binder.dispose();
                            viewModel.show(false);
                        });
               });
           }
       };

       this.dispose = function(){
           that.$element = null;
           that = null;
       }
   }

    ko.bindingHandlers.modal = new BindingWrapper(Modal);

});
