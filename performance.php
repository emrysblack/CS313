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
    Search Performances
    <br/>
    <div style="margin:auto; border:2px solid #a1a1a1; 
                padding:10px 40px; background:#dddddd; 
                width:300px; border-radius:25px">
    <form action="" method="GET">
       <input type="text" name="name" placeholder="name"/><br/><br/>
       <input type="submit" value="Submit"/>
    </form>
    </div>
    </p>
    </div>
    <?php
    if (isset($_GET["name"]))
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
         $pdo = $db->prepare("SELECT * FROM Student WHERE name=:name");
         $pdo->bindValue(':name', $_POST["name"], PDO::PARAM_STR);
         $pdo->execute();
         $rows = $pdo->fetchAll(PDO::FETCH_ASSOC);
         foreach($rows as $row)
         {
            print $row . <br/>
         }
      }
    ?>
  </body>
</html>
