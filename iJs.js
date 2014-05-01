function play()
{
 var x = document.getElementById("game");
 if (x.selectedIndex != 9)
 {
   alert("sorry");
   x.options[x.selectedIndex].disabled = true;
 }
 else
 {
   alert("you win!");
 }
}
