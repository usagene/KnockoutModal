define(['jquery', 'knockout'],function($, ko){
    function ViewBinder(viewPath, viewModelPath, model) {
        var $bindingComplete,
            viewModel,
            that = this;

        this.$element = null;

        this.bindView = function (ViewTemplate, ViewModel, data) {
            this.$element.html(ViewTemplate);
            viewModel = new ViewModel(data);
            ko.applyBindingsToDescendants(viewModel, this.$element[0]);

            $bindingComplete.resolve();
        };

        this.applyBindings = function ($element) {
            this.$element = $element;
            $bindingComplete = $.Deferred();
            require([viewPath, viewModelPath], function (ViewTemplate, ViewModel) {
                if (model.getData) {
                    // async data fetch or complex data processing required
                    model.getData().done(function (data) {
                        that.bindView(ViewTemplate, ViewModel, data);
                    });
                } else {
                    // direct data object
                    that.bindView(ViewTemplate, ViewModel, model);
                }
            });

            return $bindingComplete.promise(this);
        };

        this.clearView = function () {
            // check for this.$element is necessary for nested modal dialogs where disposeChildren function may called multiple times
            if (this.$element) {
                for (var i = 0; i < this.$element.children().length; i++) {
                    ko.cleanNode(this.$element.children()[i]);
                }
                this.$element.empty();
            }
        };

        this.disposeChildren = function () {
            $bindingComplete = null;

            if (viewModel && viewModel.dispose) {
                viewModel.dispose();
            }

            this.clearView();
            this.$element = null;

            viewModel = null;
        };

        this.dispose = function () {
            this.disposeChildren();

            that = null;
        };
    }

    return ViewBinder;
});