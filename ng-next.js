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
                call();
            };

            var call = function() {
                var curr = $scope.callingArr[$scope.callingIndex];
                if(curr && $scope[curr]) { 
                    $scope.callingIndex += 1;
                    $scope[curr]();
                };           
            };

            var dispose = function(err) {
                var errHandler = $attrs.ngPassErr;
                if($scope[errHandler]) {
                    $scope[errHandler](err);
                };
            };
            
            $elem.bind(event,function() {
                $scope.callingIndex = 0;
                var arr = $attrs.ngPass;
                $scope.callingArr = $scope[arr];
                if($scope.callingArr && $scope.callingArr.length) call(); 
            });
        }
    }
});