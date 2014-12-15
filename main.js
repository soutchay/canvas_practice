angular.module('myApp', [])
.directive('drawing', function(){
	return {
		restrict: "A",
		link: function(scope, element){
			console.log(element[0]);
			console.log(scope);
			//Initialize 2D drawing context
			var ctx = element[0].getContext('2d');

			var drawing = false;
			//last coordinates before current move
			var lastX;
			var lastY;
			//Bind the mousedown event to start drawing, takes the position of the mouse
			element.bind('mousedown', function(event){
				console.log(event);
				if(event.offsetX!==undefined){
					lastX = event.offsetX;
					lastY = event.offsetY;
				} 
				else {
					lastX = event.layerX - event.currentTarget.offsetLeft;
					lastY = event.layerY - event.currentTarget.offsetTop;
				}
				//Begin Line
				ctx.beginPath();
				drawing = true;	
			});

			//When moving mouse, will start drawing if drawing is true
			element.bind('mousemove', function(event){
				// console.log(event.layerX);
				//Drawing is true when mousedown
				if(drawing) {
					//get mouse position
					if (event.offsetX!==undefined){
						currentX = event.offsetX;
						currentY = event.offsetY;
					}
					else {
						currentX = event.layerX - event.currentTarget.offsetLeft;
						currentY = event.layerY - event.currentTarget.offsetTop;
					}

					draw(lastX, lastY, currentX, currentY);
					//Set current coords to last
					lastX = currentX;
					lastY = currentY;
				}
			})

			//Binding mouseup to canvas to stop drawing
			element.bind('mouseup', function(event){
				//Stop Drawing
				drawing = false;
			});
			//Reset Canvas Function
			function reset(){
				//Reset width which essentially resets the canvas
				element[0].width = element[0].width;
			}
			//Allows a user to draw on canvas
			function draw(bX, bY, eX, eY ){
				//line begins
				ctx.moveTo(bX, bY);
				//line ends
				ctx.lineTo(eX, eY);
				//line width
				ctx.lineWidth = 15;
				ctx.quadraticCurveTo(bX, bY, eX, eY );
				//stroke color black
				ctx.strokeStyle ="#000000";
				//draw
				ctx.stroke();
			}


		}
	}
})
