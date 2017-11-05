//Global variables that will be accessed in the functions below.

var loading; // timer for loader
var TimerWalk;			// timer handle for walking
var charStep = 2;		// current step, 1=1st foot, 2=stand, 3=2nd foot, 4=stand
var currentKey = false;	// records the current key pressed
var lockUp = true;		// when lock up, character won't be able to move
var me;					// character object

// Settings:
var walkSpeed = 110;	//ms, animation speed
var walkLength = 8;		//px, move how much px per "walk"

// TO-DO look into ajax loading for Edge
// it doesn't finish placing objects before character and he goes in the wrong place...
// apparently edge does things in a slightly different order than firefox and the others...
// I need to continue testing in edge, but it seems to have worked...
// Firefox on the other hand does not seem to be fully loaded on the bigger documents...
// it looks like the target css isn't done loading...
// look into a way to appease both, and if not the most important ones...
$(document).ready(function() {
   $(".splash-loader >img").attr('src', getRandomImage());
   $(".splash-loader >img").load(function() {preload_initialize();});
	loadArea();
});

// ready to start game
$(window).load(function() {
   console.log("loaded at " + $.now());

	//KeyDown Function
	//if there is arrow key down, execute charWalk
	$(document).keydown(function(e) {
		// stops page scrolling so character can trigger it by entering areas of screen
		e.preventDefault();

		if (!lockUp && (currentKey === false)) {
			currentKey = e.keyCode;

			//execute character movement function walk('direction')
			switch(e.keyCode) {
				case 37:
					walk('left');
					break;
				case 38:
					walk('up');
					break;
				case 39:
					walk('right');
					break;
				case 40:
					walk('down');
					break;
			}
		}
	});

	//KeyUp Function
	$(document).keyup(function(e) {
		//don't stop the walk if the player is pushing other buttons
		//only stop the walk if the key that started the walk is released
		if (e.keyCode == currentKey) {

			// set the currentKey to false, this will enable a new key to be pressed
			currentKey = false;

			// clear the walk timer
			clearInterval(TimerWalk);

			// finish the character's movement if not autowalking
			if (!lockUp)
			{
				me.stop(true, true);

				// update position in case of reload
				sessionStorage.posX = newX;
				sessionStorage.posY = newY;
				sessionStorage.stance = me.attr('class');

			}
		}

	});

});

//Character Walk Function
function walk(dir) {

	// convert from language to code
	// left and right are the same
	if (dir == 'up')
		dir = 'back';
	if (dir == 'down')
		dir = 'front';


    //set the interval timer to continually move the character
    TimerWalk = setInterval(function() { processWalk(dir); }, walkSpeed);

}

//Process Character Walk Function
function processWalk(dir) {

	// don't interupt autowalk process
	if (lockUp)
		return;
	//increment the charStep as we will want to use the next stance in the animation
	//if the character is at the end of the animation, go back to the beginning

	charStep++;
	if (charStep == 5)
		charStep = 1;

	//clear current class
	me.removeAttr('class');

	//add the new class
	switch(charStep) {
		case 1:
			me.addClass(dir+'-stand');
			break;
		case 2:
			me.addClass(dir+'-right');
			break;
		case 3:
			me.addClass(dir+'-stand');
			break;
		case 4:
			me.addClass(dir+'-left');
			break;
	}


	//move the char
	switch(dir) {

		case'front':
			newX = me.offset().left;
			newY = me.offset().top + walkLength;
			// activate bottom scroll hit
			if (!$(".nav.down").hasClass("active"))
			{
				// clear class and assign
				$(".nav").removeClass("active");
				$(".nav.down").addClass("active");
			}
			break;

		case'back':
			newX = me.offset().left;
			newY = me.offset().top - walkLength;
			// activate top scroll hit
			if (!$(".nav.up").hasClass("active"))
			{
				// clear class and assign
				$(".nav").removeClass("active");
				$(".nav.up").addClass("active");
			}
			break;

		case'left':
			newX = me.offset().left - walkLength;
			newY = me.offset().top;
			// activate left scroll hit
			if (!$(".nav.left").hasClass("active"))
			{
				// clear class and assign
				$(".nav").removeClass("active");
				$(".nav.left").addClass("active");
			}
			break;

		case'right':
			newX = me.offset().left + walkLength;
			newY = me.offset().top;
			// activate top scroll hit
			if (!$(".nav.right").hasClass("active"))
			{
				// clear class and assign
				$(".nav").removeClass("active");
				$(".nav.right").addClass("active");
			}
			break;
	}
	// Animate moving character (it will also update your character position)
	if(canIwalk(newX, newY)){
		me.animate({left:newX, top: newY}, walkSpeed/2);
	}
}

//Process Character Walk Function
function autoWalk(dir, steps) {
// recursive function since animate happens asychronously
	//increment the charStep as we will want to use the next stance in the animation
	//if the character is at the end of the animation, go back to the beginning
	if (steps > 0) {
	charStep++;
	if (charStep == 5)
		charStep = 1;

	//clear current class
	me.removeAttr('class');

	//add the new class
	switch(charStep) {
		case 1:
			me.addClass(dir+'-stand');
			break;
		case 2:
			me.addClass(dir+'-right');
			break;
		case 3:
			me.addClass(dir+'-stand');
			break;
		case 4:
			me.addClass(dir+'-left');
			break;
	}


	//move the char
	switch(dir) {

		case'front':
			newX = me.offset().left;
			newY = me.offset().top + walkLength ;
			break;

		case'back':
			newX = me.offset().left;
			newY = me.offset().top - walkLength ;
			break;

		case'left':
			newX = me.offset().left - walkLength;
			newY = me.offset().top;
			break;

		case'right':
			newX = me.offset().left + walkLength;
			newY = me.offset().top;
			break;
	}

	// Animate moving character (it will also update your character position)
	me.animate({left:newX, top: newY}, walkSpeed/2, function(){ autoWalk(dir, steps - 1);});
	}
}


// Detects object collision and handles door entry events
function canIwalk(newX, newY) {

	// all positioning is done relative to the viewport to simplify potentially bigger numbers from large documents
	var posX = newX - $(window).scrollLeft();
	var posY = newY - $(window).scrollTop();
	var obj_left = 0;
	var obj_top = 0;

	// detect if scrolling is needed
	$(".nav.active").each (function() {
		object = $(this);

		obj_left = object.offset().left - $(window).scrollLeft();
		obj_top = object.offset().top - $(window).scrollTop();

		if(((posX < obj_left + object.width() && posX > obj_left) || (posX + me.width() < obj_left + object.width() && posX + me.width() > obj_left)) &&
		   ((posY < obj_top + object.height() && posY > obj_top ) || (posY + me.height() < obj_top + object.height() && posY + me.height() > obj_top)))
		   {
			   // use animate for scrolling so that it works smoothly with character movement
			   var top = $(window).scrollTop();
			   var left = $(window).scrollLeft();
			   if (object.hasClass("up"))
			   {
				   $('html,body').animate({
						scrollTop: top - walkLength
					}, walkSpeed / 1.5);
			   }
			   else if (object.hasClass("down"))
			   {
				   $('html,body').animate({
						scrollTop: top + walkLength
					}, walkSpeed / 1.5);
			   }
			   else if (object.hasClass("right"))
			   {
				   $('html,body').animate({
						scrollLeft: left + walkLength
					}, walkSpeed / 1.5);
			   }
			   else if (object.hasClass("left"))
			   {
				   $('html,body').animate({
						scrollLeft: left - walkLength
					}, walkSpeed / 1.5);
			   }
		   }
	});


	var walkable = true;

	// only check objects acutally visible in the window
	$(":in-viewport.obstacle").each (function() {

		object = $(this);

		obj_left = object.offset().left - $(window).scrollLeft();// use offset instead of position for better detection, it will handle child objects properly
		obj_top = object.offset().top - $(window).scrollTop();

		if(((posX <= obj_left + object.width() && posX >= obj_left) || (posX + me.width() <= obj_left + object.width() && posX + me.width() >= obj_left)) &&
		   ((posY <= obj_top + object.height() && posY >= obj_top ) || (posY + me.height() <= obj_top + object.height() && posY + me.height() >= obj_top)) ||
		   ((obj_left <= posX + me.width() && obj_left >= posX) || (obj_left + object.width() <= posX + me.width() && obj_left + object.width() >= posX)) && // for small objects
		   ((obj_top <= posY + me.height() && obj_top >= posY) || (obj_top + object.height() <= posY + me.height() && obj_top + object.height() >= posY))
					  )	{
				var passable = false;
				// locations such as valid entrances...
            	var dir = ".front"; // default to up door scenario
               var my_width = me.width() * .5;
               var my_height = 0;
               var x_step = posX + (me.width() - my_width) / 2;
               var y_step = posY;
               if($("#character").hasClass("left-stand") || $("#character").hasClass("left-left") || $("#character").hasClass("left-right")) {
                  dir = ".left";
                  my_width = 0;
                  my_height = me.height() *.5;
                  x_step = posX;
                  y_step = posY + (me.height() - my_height) / 2;
               }
               else if($("#character").hasClass("right-stand") || $("#character").hasClass("right-left") || $("#character").hasClass("right-right")) {
                  dir = ".right";
                  my_width = 0;
                  my_height = me.height() *.5;
                  x_step = posX + me.width();
                  y_step = posY + (me.height() - my_height) / 2;
               }
               else if($("#character").hasClass("front-stand") || $("#character").hasClass("front-left") || $("#character").hasClass("front-right")) {
                  dir = ".back";
                  y_step = posY + me.height();
               }
               // only bother with doors in proper direction
				$(":in-viewport.doorway" + dir).each(function(){
					object = $(this);
					obj_left = object.offset().left - $(window).scrollLeft();
					obj_top = object.offset().top - $(window).scrollTop();
					console.log("door left: " + obj_left + " - " + (obj_left + object.width()));
               console.log("me left: " + posX + " - " + (posX + me.width()));
               console.log("door top: " + obj_top + " - " + (obj_top + object.height()));
               console.log("me top: " + posY + " - " + (posY + me.height()));
               // doors must be handled a little differently than regular obstacles
               if(((x_step <= obj_left + object.width() && x_step >= obj_left) && (x_step + my_width <= obj_left + object.width() && x_step + my_width >= obj_left)) &&
                  ((y_step <= obj_top + object.height() && y_step >= obj_top ) && (y_step + my_height <= obj_top + object.height() && y_step + my_height >= obj_top))
					  ) {
                     if (!lockUp) {
                        if(object.hasClass("auto_passable") && !lockUp) {
                           enterDoorway(object);
                        }
                        else {
                           changeArea(object);
                        }
                     }
							return false;
					}
				});
			walkable = passable;
			return false;
		}
	});
	return walkable;
}

/* handles animation for entering doorways on main map */
function enterDoorway(doorway) {
	lockUp = true;

	// when hit door, auto walk to top and fire event to change screens
	var dir = "back"; // default to up
	if($("#character").hasClass("left-stand") || $("#character").hasClass("left-left") || $("#character").hasClass("left-right")) {
		dir = "left";
	}
	else if($("#character").hasClass("right-stand") || $("#character").hasClass("right-left") || $("#character").hasClass("right-right")) {
		dir = "right";
	}
	else if($("#character").hasClass("front-stand") || $("#character").hasClass("front-left") || $("#character").hasClass("front-right")) {
		dir = "front";
	}
	openDoor(doorway);
	$(".door").promise().done(function(){
		// auto walk and then alert
		autoWalk(dir, (doorway.height() + walkLength * 2)/walkLength);
		me.promise().done(function(){
			// call the other page from here
			closeDoor(doorway);
			$(".door").promise().done(function(){
            changeArea(doorway);
			});
	   });
	});
}

/* handles animation for leaving doorways on main map */
function exitDoorway(doorway) {
	// exits character and closes door, go opposite way came in
	var dir = "front"; // default to down
	if($("#character").hasClass("left-stand") || $("#character").hasClass("left-left") || $("#character").hasClass("left-right")) {
		dir = "left";
	}
	else if($("#character").hasClass("right-stand") || $("#character").hasClass("right-left") || $("#character").hasClass("right-right")) {
		dir = "right";
	}
	else if($("#character").hasClass("back-stand") || $("#character").hasClass("back-left") || $("#character").hasClass("back-right")) {
		dir = "back";
	}

	// remove after just temp
	dir = "front"; // default to down
	if($("#character").hasClass("left-stand") || $("#character").hasClass("left-left") || $("#character").hasClass("left-right")) {
		dir = "right";
	}
	else if($("#character").hasClass("right-stand") || $("#character").hasClass("right-left") || $("#character").hasClass("right-right")) {
		dir = "left";
	}
	else if($("#character").hasClass("front-stand") || $("#character").hasClass("front-left") || $("#character").hasClass("front-right")) {
		dir = "back";
	}
	$(".door").promise().done(function(){ openDoor(doorway); });
	// auto walk and then close door
	autoWalk(dir, (doorway.height() + walkLength)/walkLength);
	// promise will wait until character is done moving before execution
	me.promise().done(function(){
		closeDoor(doorway);
		$(".door").promise().done(function(){
		lockUp = false;

		// update position in case of reload
		sessionStorage.posX = newX;
		sessionStorage.posY = newY;
		sessionStorage.stance = me.attr('class');
      //delete sessionStorage.entrance;

		});
	});

}
// opens the doors for a doorway
function openDoor(doorway) {
	$(doorway).children(".door-left").animate({left: "-=100px"});
	$(doorway).children(".door-right").animate({right: "-=100px"});
	$(doorway).children(".door-up").animate({bottom: "+=100px"});
	$(doorway).children(".door-down").animate({bottom: "-=100px"});
}
// closes the doors for a doorway
function closeDoor(doorway) {
	$(doorway).children(".door-left").animate({left: "+=100px"});
	$(doorway).children(".door-right").animate({right: "+=100px"});
	$(doorway).children(".door-up").animate({bottom: "-=100px"});
	$(doorway).children(".door-down").animate({bottom: "+=100px"});
}

function changeArea(doorway) { // changes the page to a new area
   // update variables to link to new page and positions and reload
   var target = doorway.children(".door_link:first");
   var door = target.attr("name");
   var page = target.attr("href");
   if (page)
   {
      sessionStorage.entrance = door;
      sessionStorage.page = page;
      delete sessionStorage.posX;
      delete sessionStorage.posY;
      delete sessionStorage.stance;
   }
   location.reload();
}
// returns true if character is currently in an autowalk area
// is primarily used to auto exit a house on page load
function inDoorway() {
	var inHouse = false;
	var posX = me.offset().left - $(window).scrollLeft();
	var posY = me.offset().top - $(window).scrollTop();
	var obj_left = 0;
	var obj_top = 0;
	$(":in-viewport.auto_passable").each(function(){
		object = $(this);
		// look into redoing door collisions so they behave like regular ones...it may solve a few corner case problems...
		obj_left = object.offset().left - $(window).scrollLeft();
		obj_top = object.offset().top - $(window).scrollTop();


		if(((posX <= obj_left + object.width() && posX >= obj_left) || (posX + me.width() <= obj_left + object.width() && posX + me.width() >= obj_left)) &&
         ((posY <= obj_top + object.height() && posY >= obj_top ) || (posY + me.height() <= obj_top + object.height() && posY + me.height() >= obj_top))
		  )	{
				if(object.hasClass("doorway")) {
					lockUp = true;
					inHouse = object;
				}
				return false;
		}
	});
	return inHouse;
}

// for page setup, add things here to start before game
function setupGame() {
   console.log("setupGame");
   if ($("#loaded").offset().left && $("#loaded").offset().top) {
      console.log("finished loading");
      clearInterval(loading);
	if(typeof(Storage) === "undefined")
	{
		alert("It appears your browser is out of date. Some features may not work properly. Try updating your browser or try a different browser");
	}
	me = $('#character');
   if (sessionStorage.entrance)
   {
      var door_left = $('#'+sessionStorage.entrance).offset().left;
      var door_top = $('#'+sessionStorage.entrance).offset().top;
      me.removeAttr('class');

      // ready position, very important for large entrances
      if ($('#'+sessionStorage.entrance).hasClass('front'))
      {
         me.addClass('back-stand');
         door_left += ($('#'+sessionStorage.entrance).width() - me.width())/2;
      }
      else if ($('#'+sessionStorage.entrance).hasClass('back'))
      {
         me.addClass('front-stand');
         door_left += ($('#'+sessionStorage.entrance).width() - me.width())/2;
      }
      else if ($('#'+sessionStorage.entrance).hasClass('left'))
      {
         me.addClass('right-stand');
         door_top += ($('#'+sessionStorage.entrance).height() - me.height())/2;
      }
      else if ($('#'+sessionStorage.entrance).hasClass('right'))
      {
         me.addClass('left-stand');
         door_top += ($('#'+sessionStorage.entrance).height() - me.height())/2;
      }
      // update position
      me.offset({ top: door_top, left: door_left });
      sessionStorage.posX = me.offset().left;
      sessionStorage.posY = me.offset().top;
      sessionStorage.stance = me.attr('class');
      delete sessionStorage.entrance;
   }
   else
   {
      // place character
      if (sessionStorage.stance)
      {
         me.offset({ top: Number(sessionStorage.posY), left: Number(sessionStorage.posX) });
         me.addClass(sessionStorage.stance);
      }
      else
      {
         // add default character state class
         me.addClass('front-stand');
      }
   }
   focusPlayer();
   // dismiss splash screen and start the game
   preload_advance(3500, "100%", startGame);
	// scroll focus window on character when resized so we never lose sight
	$(window).resize(function(){
      focusPlayer();
	});
   }
   else {
      console.log("loading...");
      preload_advance(500); // just increase a bit
   }
}

function loadArea() {
   // load map
   var page = 'area1.html';
   if (sessionStorage.page) {
      page = sessionStorage.page;
   }
   $.ajax({
        url: 'maps/' + page,
        async: false, // responseText is empty if set to true
        error: function(){
               alert("ERROR: Could not load page");
        },
         success: function(response){
              $('#area').html(response);
              // finish loading progress

              $('#area').fadeIn('fast', function() {
                 console.log("preloaded at " + $.now());
                 loading = setInterval(function() { setupGame(); }, 1000);
              } );

        }
    });
}
function focusPlayer() {
   $(window).scrollTop(me.offset().top - window.innerHeight/2);
	 $(window).scrollLeft(me.offset().left - window.innerWidth/2);
   console.log("focus!");
   console.log(me.offset().top);
   console.log(me.offset().left);
}

/* actions that happen after player is shown the map, but before control is given to player */
function startGame() {
   // dismiss screen
   $('.splash-loader').delay(1000).fadeOut('slow', function() {
   // if in house, exit before playing
	var doorway = inDoorway();
	if (doorway != false) {
		exitDoorway(doorway);
	}
   else { // ready to play
      lockUp = false;
   }
    });
}
