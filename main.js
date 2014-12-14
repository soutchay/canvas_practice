angular.module('myApp', [])
.directive('drawing', function(){
	return {
		restrict: "A",
		link: function(scope, element){
			console.log(element[0]);
			console.log(scope);
			//Initialize 2D drawing context
			var ctx = element[0].getContext('2d');
		}
	}
})
