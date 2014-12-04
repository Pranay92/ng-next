angular.module('next',[])
.directive('ngPass',function() {
  return {
    link : function($scope,$elem,$attrs) {

      var pass = $attrs.ngPass;
      var arr = extractArray(pass);
      var event = $attrs.ngPassEvent || 'click';
      var len = arr.length;
      
      /*
        the following will loop through each element of the array,
        throws error if any of them is'nt a function
      */
      function walkThrough(arr,index) {

        if(index === arr.length) return;
        var curr = $scope[arr[index]];
        if(typeof curr !== 'function') {
            var memberType = typeof curr;
            throw new Error(curr + ' should be a function but instead found ' + memberType);  
        } 
        index += 1;
        walkThrough(arr,index);

      }

      // immediately invoke the walkthrough on the element on directive load
      walkThrough(arr,0);

      /*
        @swagger method that returns the actual array from the argument
        @args can be passed an array name that exist in the scope OR an array itself that has list of functions
      */
      function extractArray(arr) {
        
        var arr = arr;
        if (!arr) throw new Error('Argument passed in at ng-pass cannot be undefined');

        arr = $scope.$eval(arr);
        
        if (!arr) throw new Error('Argument passed in at ng-pass does not exist in the current scope');

        var isArray = Array.isArray(arr);

        if(!isArray) throw new Error('Argument passed in at ng-pass must be an array');

        if (!arr.length) throw new Error('Argument passed in at ng-pass cannot be an empty array');

        return arr;

      }

      // this is the function that will be called from the controller
      $scope.next = function(err) {

        if(err)  {
          //to be call if an error occured
          dispose(err); 
          return;
        };
        if($scope.nxMethod) call();

      };

      // this will call each function from the $scope array
      var call = function() {

        var curr = $scope.nxCallingArr[$scope.nxCallingIndex];
        if(curr && $scope[curr]) { 
          $scope.nxCallingIndex += 1;
          $scope[curr]();
          return;
        }
        $scope.nxMethod = false;

      };

      // if there is any error passed in call the dispose and exit calling array functions
      var dispose = function(err) {
        
        var errHandler = $attrs.ngPassErr;
        $scope.nxMethod = false;
        if($scope[errHandler]) {
            $scope[errHandler](err);
        };

      };
      
      /*
          @params event -- the HTML event passed in from the directive argument itself
              defaults to false
      */
      $elem.bind(event,function() {
        
        $scope.nxCallingIndex = 0;
        var arr = extractArray($attrs.ngPass);
        $scope.nxCallingArr = arr;
        if($scope.nxCallingArr && $scope.nxCallingArr.length) {
          $scope.nxMethod = true;
          call();
        };

      });

    }
  }
});
