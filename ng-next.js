angular.module('next',[])
.directive('ngPass',function() {
    return {
        link : function($scope,$elem,$attrs) {
            var pass = $attrs.ngPass;
            var arr = $scope[pass];
            var event = $attrs.ngPassEvent || 'click';
            if(!arr.length) throw new Error('should be an array');
            $scope.next = function(err) {
                if(err)  {

                    //to be call if an error occured
                    dispose(err); 
                    return;
                };
		if($scope.ngMethod) call();
            };

            var call = function() {
                var curr = $scope.callingArr[$scope.callingIndex];
                if(curr && $scope[curr]) { 
                    $scope.callingIndex += 1;
                    $scope[curr]();
		    return;
                };
		$scope.nxMethod = false;           
            };

            var dispose = function(err) {
                var errHandler = $attrs.ngPassErr;
		$scope.nxMethod = false;
                if($scope[errHandler]) {
                    $scope[errHandler](err);
                };
            };
            
            $elem.bind(event,function() {
                $scope.callingIndex = 0;
                var arr = $attrs.ngPass;
                $scope.callingArr = $scope[arr];
                if($scope.callingArr && $scope.callingArr.length) {
		    $scope.nxMethod = true;
		    call();
		}; 
            });
        }
    }
});
