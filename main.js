var key = 0;

$(function(){
	setInterval(function(){
		draw();
		// key = 0;
	}, 40);

	$(document).keydown( function (e) {
	    key = e.which;
		console.log(key);
	});
	$(document).keyup( function (e) {
	    key = 0;
		console.log(key);
	});
	// $("#myCanvas").click(function (e) {
	// 	console.log("yeah");
	// 	key = 39;
	// });
});

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";

var bgImage = document.getElementById("bg");
var megaSprite = document.getElementById("megaman");

var megaman = {
	hp: 100,
	position: {x:20, y:540},
	status: "init",
	lastStatusChangeAt: 0
};

// var megamanStatus = "init",
// 	lastStatusChangeAt = 0;

var counter=0

function draw(){

	if (counter<sprites.megaman.debut.length*2) {
		megaman.status = "init";
	} else {
		if(key === 39){
			if (megaman.status!="run") {
				megaman.lastStatusChangeAt = counter;
			}
			megaman.position.x += 3;
			megaman.status="run";
		} else if (key===37) {
			megaman.position.x -= 3;
			megaman.status="run";
		} else {
			if (megaman.status!="standby") {
				megaman.lastStatusChangeAt = counter;
			}
			megaman.status = "standby"; 
		}
	}

	ctx.drawImage(bgImage,0,0);
	var _frame; 
	if (megaman.status == "init"){
		_frame = sprites.megaman.debut[parseInt(counter/2,10)]
	} else if (megaman.status == "standby") {
		_frame = sprites.megaman.standby[parseInt(counter/3,10) % sprites.megaman.standby.length]
	}  else if (megaman.status == "run") {
		_frame = sprites.megaman.run[parseInt(counter/2,10) % (sprites.megaman.run.length-2) + 2];
		// if ( counter > megaman.lastStatusChangeAt + sprites.megaman.run.length*2 ){
		// 	_frame = sprites.megaman.run[parseInt(counter/2,10) % (sprites.megaman.run.length-2) + 2];
		// } else {
		// 	_frame = sprites.megaman.run[parseInt(counter/2,10) % (sprites.megaman.run.length-2) + 2];
		// }
	} 

	ctx.drawImage( megaSprite, _frame[0], _frame[1], _frame[2], _frame[3], megaman.position.x-_frame[2]/2, megaman.position.y-_frame[3], _frame[2], _frame[3] );

	ctx.fillText("HP:"+megaman.hp,10,50);
	ctx.fillText("Status:"+megaman.status,10,100);

	counter++;
}