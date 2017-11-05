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
            $dbname = "PianoPower";
            if ($user == '')
            {
               $user = "root";
               $password = "";
               $host = 'localhost';
               $port = 3306;
               $dbname = "pianopower";
            }
            $pdo = new PDO("mysql:host=$host:$port;dbname=$dbname", $user, $password);
         }
         catch(PDOException $e)
         {
            echo 'ERROR: ' . $e->getMessage();
            die("Could not connect to database");
         }
         $name = $_POST["name"];
         $db = $pdo->prepare("SELECT Student.name, Skill.level, Instrument.name, Type.name, Building.name, Room.number, Time.slot FROM Student 
         INNER JOIN Performance ON Student.id = Performance.studentId 
         INNER JOIN Skill ON Performance.SkillId = Skill.id
         INNER JOIN Instrument ON Performance.instrumentId = Instrument.id
         INNER JOIN Type ON Performance.typeId = Type.id
         INNER JOIN Room ON Performance.roomId = Room.id 
         INNER JOIN Building ON Room.buildingId = Building.id
         INNER JOIN Time ON Performance.timeId = Time.id         
         WHERE Student.name=:name");
         $db->bindParam(':name', $name);
         $db->execute();
         $rows = $db->fetchAll(PDO::FETCH_NUM);
         print '<div style="margin:auto; border:2px solid #a1a1a1; 
                padding:10px 40px; background:#dddddd; 
                width:300px; border-radius:25px">';
         if(count($rows))
         {
            foreach($rows as $row)
            {
               print '<b>' . $row[0] . '</b>' . '<br/>' . $row[1] . 
               '<br/>' . $row[2] . ' ' . $row[3] . 
               '<br/>' . $row[4] . ' ' . $row[5] . '<br/>' . date("H:i ",strtotime($row[6])) . '<br/>';
            }
         }
         else
            print 'No record for ' . $name;
         print '</div>';
      }
    ?>
  </body>
</html>
