define(['jquery', 'knockout'],function($, ko){
    function ViewBinder(viewPath, viewModelPath, modelPath){
        var $bindingComplete,
            viewModel,
            that = this;

        this.$element = null;

        this.applyBindings = function($element){
            this.$element = $element;
            $bindingComplete = $.Deferred();
            require([viewPath, viewModelPath, modelPath], function(ViewTemplate, ViewModel, model){
                model.fetch().done(function(data){
                    $element.html(ViewTemplate);
                    viewModel = new ViewModel(data);
                    ko.applyBindingsToDescendants(viewModel, $element[0]);

                    $bindingComplete.resolve();
                });
            });

            return $bindingComplete.promise(this);
        };

        this.clearView = function(){
            for (var i = 0; i < this.$element.children().length; i++) {
                ko.cleanNode(this.$element.children()[i]);
            }
            this.$element.empty();
        };

        this.dispose = function(){
            $bindingComplete = null;

            if(viewModel && viewModel.dispose){
                viewModel.dispose();
            }

            this.clearView();
            this.$element = null;

            viewModel = null;
            that = null;
        };
    }

    return ViewBinder;
});