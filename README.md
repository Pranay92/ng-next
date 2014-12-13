ng-next
=======

AngularJS directive simulating Express.js like next() feature in angularjs.

### [Demo](http://jsfiddle.net/pn405j7q/22/)

### Install via [Bower](http://bower.io/)

`bower install ng-next`

## Consider the following code in your controller


```` 
angular.module('app',[])
    .controller('myCtrl',function($scope) {
        $scope.post = function() {
          var valid = $scope.validate();
          if(valid) $scope.sanitize();

          // http request here
        };

        $scope.validate = function() {
          
          // some validation logic here
        };

        $scope.sanitize = function() {
          
          //some sanitization logic here
        };
});
````

the above code isn't very complex but one big issue here is all the functions are **coupled** with each other. 

**Node** frameworks like **Express** provide a beutiful feature that solves the above problem by invoking the `next()` function. 

However, AngularJS doesn't comes equipped with something like that, but it turns out that it can be easily implemented with the help of directive.

### By using `ng-next` you can write the above as:

````
 angular.module('app',['next']) 
  .controller('myCtrl',function($scope) { 
    $scope.list = ['validate','sanitize','post'];

    $scope.post = function() {
      //only the http request here 
      $scope.next(); //special function provided by the directive
    };

    $scope.validate = function() {
      
      //only validation logic here
      $scope.next();
    };

    $scope.sanitize = function() {
      
      // only sanitization logic here
      $scope.next();
    };
 });
 
````

and on the `element` you can simply pass

`<button ng-pass="list"> Press </button>`

this will search for a array containing a list of functions in the `current scope` and will call each of them in the sequence they are added in the array.

In case of any error, you can also pass an `error` message on the `$scope.next()` function invocation as an argument. This will stop executing the succeeding functions in the list and will call the default error handler(if defined) for the function.


### Usage

The above example is complete enough to understand how the directive would work. However feel free to copy paste only the directive code and add in your app if you don't want to inject dependncy on your main module.

### Note 

You might be wandering what if we call the **same functions** that are in the `list` individually, instead of the directive via `ng-click` (for example `ng-click="validate()"`) on any html element. Well that is just fine. The directive will ignore the `$scope.next()` function invocation when any of the `list` methods are called individually. 

### Options

1. `ng-pass-event` -- event that will trigger the functions. Defaults to `click`

2. `ng-pass-err` -- default error handler that will be invoked if any of the function throws err;

3. `ng-pass` -- the main directive attribute. This needs to be passed a name of an array(that should exist in the current scope) and should contain the list of function names(that are defined in the current scope) OR a list of array itself like the following:

`ng-pass="['validate','sanitize']"` 

and each of them should exist in the current `$scope`



