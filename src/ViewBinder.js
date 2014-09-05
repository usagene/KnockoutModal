define(['jquery', 'knockout'],function($, ko){
    function ViewBinder(viewPath, viewModelPath, modelPath){
        var $bindingComplete = $.Deferred(),
            viewModel,
            that = this;

        this.applyBindings = function($element){
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

        this.dispose = function(){
            $bindingComplete = null;

            if(viewModel && viewModel.dispose){
                viewModel.dispose();
            }

            viewModel = null;
            that = null;
        };
    }

    return ViewBinder;
});