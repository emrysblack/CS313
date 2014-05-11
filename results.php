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
    <?php
         $votes = array();
         $myfile = fopen("results.txt", "r");
         for($i = 0; !feof($myfile); $i++)
         {
             $votes[$i] = fgets($myfile);
         }
         fclose($myfile);
       echo'<div style="margin:auto; border:2px solid #a1a1a1;' . 
                'padding:10px 40px; background:#dddddd;' . 
                'width:300px; border-radius:25px">' .
                'Episode I - The Phantom Menace: ' . $votes[0] . '<br/>' .
       'Episode II - Attack of the Clones: ' . $votes[1] . '<br/>' .
       'Episode III - Revenge of the Sith: ' . $votes[2] . '<br/>' .
       'Episode IV - A New Hope: ' . $votes[3] . '<br/>' .
       'Episode V - The Empire Strikes Back: ' . $votes[4] . '<br/>' .
       'Episode VI - Return of the Jedi: ' . $votes[5] . '<br/>' .
       "I don't like any of them: " . $votes[6] . '<br/>' .
       '</div>';
    ?>
  </body>
</html>
