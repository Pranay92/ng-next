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
		if($scope.nxMethod) call();
            };

            var call = function() {
                var curr = $scope.nxCallingArr[$scope.nxCallingIndex];
                if(curr && $scope[curr]) { 
                    $scope.nxCallingIndex += 1;
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
                $scope.nxCallingIndex = 0;
                var arr = $attrs.ngPass;
                $scope.nxCallingArr = $scope[arr];
                if($scope.nxCallingArr && $scope.nxCallingArr.length) {
		    $scope.nxMethod = true;
		    call();
		}; 
            });
        }
    }
});
