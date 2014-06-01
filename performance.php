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
  <title>Performances</title>
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
    Search Performances
    <br/>
    <div style="margin:auto; border:2px solid #a1a1a1; 
                padding:10px 40px; background:#dddddd; 
                width:300px; border-radius:25px">
    <form action="" method="POST">
       <input type="text" name="name" placeholder="name"/><br/><br/>
       <input type="submit" value="Submit"/>
    </form>
    </div>
    </p>
    </div>
    <?php
    if (isset($_POST["name"]))
    {
         try
         {
            $user = getenv('OPENSHIFT_MYSQL_DB_USERNAME');
            $password = getenv('OPENSHIFT_MYSQL_DB_PASSWORD');
            $host = getEnv("OPENSHIFT_MYSQL_DB_HOST");
            $port = getEnv("OPENSHIFT_MYSQL_DB_PORT");
            $pdo = new PDO("mysql:host=$host:$port;dbname=php", $user, $password);
         }
         catch(PDOException $e)
         {
            echo 'ERROR: ' . $e->getMessage();
            die("Could not connect to database");
         }
         $name = $_POST["name"];
         $db = $pdo->prepare("SELECT name FROM Student WHERE name=:name");
         $db->bindParam(':name', $name);
         $db->execute();
         $rows = $db->fetchAll(PDO::FETCH_ASSOC);
         print '<div style="margin:auto; border:2px solid #a1a1a1; 
                padding:10px 40px; background:#dddddd; 
                width:300px; border-radius:25px">';
         if(count($rows))
         {
            print '<table>';       
            foreach($rows as $row)
            {
               print '<tr>' . count($rows) . '<tr/>';
            }
            print '</table>';
         }
         else
            print 'No record for ' . $name;
         print '</div>';
      }
    ?>
  </body>
</html>
