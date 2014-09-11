/**
 * Created by Sunshine on 9/3/14.
 */
define(["jquery"], function($){
    var $deferred = null;

    return {
        getData: function(){
            $deferred = $.Deferred();
            $deferred.resolve({name: "Tested Name"});
            return $deferred.promise();
        }
    }
});