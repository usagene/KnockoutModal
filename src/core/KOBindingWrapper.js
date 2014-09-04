define("bindingWrapper", ['knockout', 'jquery', 'jqueryui'], function (ko, $) {
    'use strict';

    function BindingWrapper(HandlerClass, controlDescendantBindings) {

        // This needs to be private so no body outside the binding could modify it
        var bindingInstances = {}, that = this, bindingWrapperAttr = "data-costar-binding";

        // default controlDescendantBindings to true
        if (controlDescendantBindings === undefined || controlDescendantBindings === null) {
            controlDescendantBindings = true;
        }

        this.registerHandlerInstance = function ($element, valueAccessor) {
            var id = $element.uniqueId().attr("id");

            // use custom attribute to same the binding handler instance id so it does not conflict with other usages of DOM id, particularly dynamic id generations.
            $element.attr(bindingWrapperAttr, id);

            if (!bindingInstances[id]) {

                // Expose the valueAccessor to handler class in case the handler has custom event which results at updating the valueAccessor
                bindingInstances[id] = new HandlerClass($element, valueAccessor);
            }

            return bindingInstances[id];
        };

        this.getHandlerInstance = function ($element) {
            var bindingId = $element.attr(bindingWrapperAttr);
            return bindingInstances[bindingId];
        };

        this.disposeHandler = function (handler, id) {
            if (id) {
                bindingInstances[id] = null;
            }

            if (handler.dispose) {
                handler.dispose();
            }
        };

        // This function is used for monitoring and unit testing purpose
        this._getAllBindingInstances = function () {
            return bindingInstances;
        };

        this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //debug.log(HandlerClass.name + " Initialized");
            var handler = that.registerHandlerInstance($(element), valueAccessor);

            if (handler.init) {
                handler.init(ko.utils.unwrapObservable(valueAccessor()), ko.utils.unwrapObservable(allBindingsAccessor()), viewModel, bindingContext);
            }

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                that.disposeHandler(handler, element.id);
                //debug.log(HandlerClass.name + " Disposed");
            });

            return { controlsDescendantBindings: controlDescendantBindings };
        };

        this.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = that.getHandlerInstance($(element));
            if (handler.update) {
                handler.update(ko.utils.unwrapObservable(valueAccessor()), ko.utils.unwrapObservable(allBindingsAccessor()), viewModel, bindingContext);
            }
        };
    }

    return BindingWrapper;
});