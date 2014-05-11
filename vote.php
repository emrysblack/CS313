<!doctype html>
<html lang="en">
<!--
   My home page
  -->
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <script type = "text/javascript" src = "iJs.js"></script>
  <link href = "iStyle.css" type = "text/css" rel = "stylesheet">
  <title>Voting</title>
  </head>
  <body>
    <h1>CS 313</h1>
    <div id="links">
    <div>
      <a href = "index.php">Home</a>
      </div>
      <div>
      <a href = "assignments.html">Assignments</a>
      </div>
    </div>
    <hr/>
    <div>
    <p class="p1">
     Favorite Star Wars Movie?
    <br/>
    <div style="margin:auto; border:2px solid #a1a1a1; 
                padding:10px 40px; background:#dddddd; 
                width:300px; border-radius:25px">
    <form action="" method="GET">
       <input type="radio" name="vote" value="1" checked />Episode I - The Phantom Menace<br/>
       <input type="radio" name="vote" value="2"/>Episode II - Attack of the Clones<br/>
       <input type="radio" name="vote" value="3"/>Episode III - Revenge of the Sith<br/>
       <input type="radio" name="vote" value="4"/>Episode IV - A New Hope<br/>
       <input type="radio" name="vote" value="5"/>Episode V - The Empire Strikes Back<br/>
       <input type="radio" name="vote" value="6"/>Episode VI - Return of the Jedi<br/>
       <input type="radio" name="vote" value="7"/>I don't like any of them<br/><br/>
       <input type="submit" value="vote"/>
    </form>
    <br/>
    <a href="results.php">View Results</a>
    </div>
    </p>
    </div>
       <?php
      if (isset($_COOKIE["voted"]))
      {
         // redirect to results page
         echo "redirect</br>";
      }
      elseif ($_GET["vote"])
      {
         // write to file
         echo "written<br/>";
         // set cookie
         setcookie("voted""$_GET['vote']");
         // redirect to results page
         echo "redirect</br>";
      }
    ?>
  </body>
</html>
