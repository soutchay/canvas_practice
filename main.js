angular.module('myApp', [])
.directive('drawing', function($window){
	return {
		restrict: "A",
		link: function(scope, element){
			console.log($window);
			console.log(element);
			//Initialize 2D drawing context
			var theCanvas = element[0];
			theCanvas.width = window.innerWidth;
			theCanvas.height = window.innerHeight;

			var ctx = element[0].getContext('2d');
			var device = {};
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
				device.data = {
					on: 'touchstart',
					move: 'touchmove',
					off: 'touchend'
				};
				console.log(device.data);
			}
			else {
				console.log('no touch');
				device.data = {
					on: 'mousedown',
					move: 'mousemove',
					off: 'mouseup'
				};
				console.log(device.data);
			}

			// Drawing used to tell if currently drawing
			var drawing = false;
			//last coordinates before current move
			var lastX;
			var lastY;
			//Bind the mousedown event to start drawing, takes the position of the mouse
			element.bind(device.data.on, function(event){
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
			element.bind(device.data.move, function(event){
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

			//Give a user a random color to differentialize
			var userColor = Math.floor(Math.random()*1000000);

			//Binding mouseup to window to stop drawing, when moves off canvas will stop drawing
			angular.element($window).bind(device.data.off, function(event){
				console.log('off');
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
