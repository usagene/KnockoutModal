/**
 * Created by Sunshine on 9/3/14.
 */
define(['jquery', 'knockout','komapping'], function($, ko,komapping){
   function DialogViewModel(modal){
       $.extend(this, komapping.fromJS(modal));

       this.submit = function(){
         console.log("Submit clicked");
       };

   }

    return DialogViewModel;
});