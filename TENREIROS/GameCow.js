// JavaScript Document
//var canvas, stage, exportRoot, images;
var platypii = [];
var score = 0;
var canvas, stage, exportRoot;

function init() {
	canvas = document.getElementById("canvas");
	images = images||{};

	var manifest = [
		{src:"images/cliff.png", id:"cliff"},
		{src:"images/co.png", id:"co"},
		{src:"images/cow.png", id:"cow"},
		{src:"images/cow2.png", id:"cow2"},
		{src:"images/cowhead.png", id:"cowhead"},
		{src:"images/cowhead2.png", id:"cowhead2"},
		{src:"images/cowl1.png", id:"cowl1"},
		{src:"images/cowl2.png", id:"cowl2"},
		{src:"images/cowl3.png", id:"cowl3"},
		{src:"images/cowl4.png", id:"cowl4"},
		{src:"images/cowmouth.png", id:"cowmouth"},
		{src:"images/cowmouthgifcopia.png", id:"cowmouthgifcopia"},
		{src:"images/cowtail.png", id:"cowtail"},
		{src:"images/pine.png", id:"pine"},
		{src:"images/pines.png", id:"pines"},
		{src:"sounds/pop.mp3", id:"pop"}
	];

	var loader = new createjs.LoadQueue(false);
	//var loader = new PreloadJS(false);
	loader.installPlugin(createjs.Sound);
	//loader.installPlugin(SoundJS);
	// fires every time a file finishes loading successfully:
	loader.addEventListener("fileload", handleFileLoad);
	//loader.onFileLoad = handleFileLoad;
	// fires when all the files are done loading:
	loader.addEventListener("complete", handleComplete);
	//loader.onComplete = handleComplete;
	loader.loadManifest(manifest);
	//loader.loadManifest(manifest);
}


function handleFileLoad(evt) {
	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}
/*function handleFileLoad(o) {
	// the published content expects to find images in the images object.
	if (o.type == "image") { images[o.id] = o.result; }
}*/
function playSound(id, loop) {
	createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop);

/*function playSound(name, loop) {
	SoundJS.play(name, SoundJS.INTERRUPT_EARLY, 0, 0, loop);
}*/

function handleComplete() {
	exportRoot = new lib.PlatypusGame();

	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);
	stage.update();

	createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick", stage);
}

/*function handleComplete() {
	exportRoot = new lib.PlatypusGame();
	exportRoot.removeChild(exportRoot.platypus);

	stage = new Stage(canvas);
	stage.addChild(exportRoot);
	
	Touch.enable(stage);

	Ticker.setFPS(20);
	// add the listener to window, so we can do some work before updating the stage:
	Ticker.addListener(window);
}*/

function tick() {
	if (platypii.length < 1 || Math.random() < 0.01 && platypii.length < 5) {
		var platypus = new lib.Platypus();
		platypus.scaleX = platypus.scaleY = Math.random()*0.3+0.3;
		platypus.x = 800;
		// nominalBounds holds the dimensions of the first frame of the symbol at export time.
		platypus.y = Math.random()*(400-platypus.scaleY*platypus.nominalBounds.height);
		platypus.velX = (1+platypus.scaleX)*-6;
		platypus.velY = 0;
		// we only want to know about clicks on the balloon, not the whole platypus:
		platypus.platypusIdle.balloon.onClick = handleBalloonClick;
		platypus.onPopped = handleBalloonPopped;
		
		platypii.push(platypus);
		exportRoot.addChild(platypus);
	}
	
	// go in reverse to make it easier to splice items from the array
	for (var i=platypii.length-1; i>=0; i--) {
		platypus = platypii[i];
		
		// add gravity to the Y velocity if it's falling:
		if (platypus.falling) { platypus.velY += 3; }
		platypus.x += platypus.velX;
		platypus.y += platypus.velY;
		
		if (platypus.x < -platypus.nominalBounds.width*platypus.scaleX || platypus.y > 400) {
			platypii.splice(i,1);
			exportRoot.removeChild(platypus);
			// add +100 points if it fell or -500 if it escaped
			updateScore(platypus.y > 400 ? 100 : -500);
		}
	}
	
	stage.update();
}

function handleBalloonClick(eventObj) {
	// eventObj.target is the balloon that was clicked. Grab the platypus instance:
	var platypus = eventObj.target.parent.parent;
	platypus.gotoAndPlay("pop");
}

function handleBalloonPopped(platypus) {
	platypus.falling = true;
}

function updateScore(delta) {
	score = Math.max(0,score + delta);
	exportRoot.scoreTxt.text = "SCORE: "+score;
}