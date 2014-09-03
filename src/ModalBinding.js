define([], function(){
   function Modal(){
       var $element = null,
           that = this;

       this.init = function(element, valueAccessor, allBindingsAccessor){
           this.$element = $(element);
       };

       this.update = function(element, valueAccessor){
           var showModal = ko.utils.unwrapObservable(valueAccessor()),
               allBindings = allBindingsAccessor(),
               $dialog = null;

           if(showModal && allBindings.binder){
               allBindings.binder.applyBindings().done(function(){
                       $dialog = $(".modal", that.$element[0]);
                       $dialog.show();

                        $dialog.on("hidden", function(){
                            //allBindings.binder.dispose();
                        })
               });
           }
       };

       this.dispose = function(){
            $element = null;
           that = null;
       }
   }

    ko.bindingHandlers.modal = new Modal();

});
