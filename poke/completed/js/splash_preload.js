/* TO-DO use canvas to get corner color to background */
function preload_initialize()
{
   var width = $(".splash-loader > img").css("width");
   var height = $(".splash-loader > img").css("height");
   var top = ($(window).outerHeight() - $(".splash-loader > img").outerHeight())/2;
   var left = ($(window).outerWidth() - $(".splash-loader > img").outerWidth())/2;
   var color = rgb2hex($(".splash-loader").css("background-color"));
   var img = $(".splash-loader > img").attr("src");
   /*
   console.log(width);
   console.log(height);
   console.log("top: " + top);
   console.log("left: "+ left);
   console.log("color: "+ color);
   console.log("img: "+ img);
   console.log("outerHeight: " + $(".splash-loader > img").outerHeight());
   console.log("window: " + $(window).outerHeight());
   */
   $(".splash-loader > .splash-img").css("background", color + " url(" + img +") no-repeat");
   $(".splash-loader > .splash-img").css("background-size",width + " " + height);
   $(".splash-loader > .splash-img").css("background-position",left + "px " + top + "px");
   
   $(".splash-loader > .splash-progress").css("background", color + " url(" + img +") no-repeat");
   $(".splash-loader > .splash-progress").css("background-size",width + " " + height);
   $(".splash-loader > .splash-progress").css("background-position",left + "px " + top + "px");
}
function preload_advance(time, percentage, callback) 
{
   if (percentage === undefined) {
      var width = $('.splash-loader > .splash-progress').width();
      var parentWidth = $(window).width();
      var percent = 100*width/parentWidth;
      percent += (100 - percent)/4;
      percentage = percent.toString() + "%";
      console.log(percentage);
   }
   if(callback === undefined) {
      callback = function(){};
      console.log("no callback");
   }
   $(".splash-loader > .splash-progress").animate({width:percentage}, time, function() { callback(); });
}
/* converts rbg to hex */
/* credit to contributers at stackoverflow for this implimentation */
function rgb2hex(rgb) 
{
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function getRandomImage()
{
   var image_path = 'css/img/splash/'
   var images = [
      "starter-pokemon.jpg",
      "starter-pokemon1.png",
      "starter-pokemon2.png",
      "starter-pokemon3.png"
   ];
    return image_path + images[Math.floor(Math.random() * images.length)];
}