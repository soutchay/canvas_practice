angular.module('myApp', [])
.directive('drawing', function(){
	return {
		restrict: "A",
		link: function(scope, element){
			//Initialize 2D drawing context
			var ctx = element[0].getContext('2d');

			//Function to find out if device has touch capabilities, returns true if has touch
			function is_touch_device() {
			try {
				//Forces a boolean value to be returned with !!
				return !!('ontouchstart' in window);
				}
			catch (e) {
				return false;
				}
			}
			if (is_touch_device()){
				console.log('has touch');
			}
			else {
				console.log('no touch');
			}

			// Drawing used to tell if currently drawing
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

			element.bind('touchstart', function(event){
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
					console.log('works');
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
			});

			//When moving mouse, will start drawing if drawing is true
			element.bind('touchmove', function(event){
				//Drawing is true when mousedown
				if(drawing) {
					console.log('works');
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
			});
			//Give a user a random color to differentialize
			var userColor = Math.floor(Math.random()*1000000);

			//Binding mouseup to canvas to stop drawing
			element.bind('mouseup', function(event){
				ctx.strokeStyle = "#" + userColor;
				ctx.stroke();
				//Stop Drawing
				drawing = false;
			});

			element.bind('touchend', function(event){
				ctx.strokeStyle = "#" + userColor;
				ctx.stroke();
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
				//Make the line curved
				ctx.lineJoin = 'round';
				ctx.quadraticCurveTo(bX, bY, eX, eY );
				//stroke color random while drawing
				var color = Math.floor(Math.random()*1000000);
				ctx.strokeStyle ="#" + color ;
				//draw
				ctx.stroke();
			}


		}
	};
});
