/**
 * Created by Sunshine on 9/3/14.
 */
define(["jquery"], function($){
    var $deferred = $.Deferred();

    return {
        fetch: function(){
            $deferred.resolve({name: "Tested Name"});
            return $deferred.promise();
        }
    }
});