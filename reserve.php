<!doctype html>
<html lang="en">
<!--Assignments Page
   Conatins links to other assignments
  -->
  <head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Music Register</title>
    <script>
    function duet(show)
{
   if (show)
      document.getElementById("duet").style="display:inline";
   else
      document.getElementById("duet").style="display:none";
}
    </script>
  </head>
  <body style="background-color:#d0e4fe">
    <h1 style="color:orange; text-align:center">CS 213</h1>
    <hr/>
    <p style="font-family:Times New Roman; font-size:20px;
              text-align:center;">
      Piano Festival Registration
    </p>
    <div style="margin:auto; border:2px solid #a1a1a1; 
                padding:10px 40px; background:#dddddd; 
                width:300px; border-radius:25px">
      <form  action="" method="POST">
        <table>
          <tr>
            <td>
              <input type="radio" name="pType" value="1" 
                     onclick="duet(false)" checked/>Solo
              <input type="radio" name="pType" value="2" 
                     onclick="duet(true)"/>Duet
              <input type="radio" name="pType" value="3" 
                     onclick="duet(false)"/>Concerto
            </td>
          </tr>
          <tr>
            <td><hr/>Student<hr/></td>
          </tr>
          <tr>
            <td>
              <input type="text" name="fName" placeholder="First Name"/>
              <input type="text" name="lName" placeholder="Last Name"/>
              <input type="text" name="sId" placeholder="Student ID Number"/>
            </td>
          </tr>
          <tr>
            <td>
              <select name="skill">
                <option value="skill level" 
                        disabled selected>Skill Level</option>
                <option name="skill" value="1">Beginner</option>
                <option name="skill" value="2">Intermediate</option>
                <option name="skill" value="3">Pre-Advanced</option>
                <option name="skill" value="4">Advanced</option>
              </select>
              <select name="inst">
                <option value="Instrument" disabled selected>Instrument</option>
                <option name="inst" value="1">Piano</option>
                <option name="inst" value="2">Voice</option>
                <option name="inst" value="3">String</option>
                <option name="inst" value="4">Organ</option>
                <option name="inst" value="5">Other</option>
              </select> 
            </td>
          </tr>
        </table>
        <table id="duet" style="display:none">
          <tr>
            <td><hr/>Student #2<hr/></td>
          </tr>
          <tr>
            <td>
              <input type="text" name="fName1" placeholder="First Name"/>
              <input type="text" name="lName1" placeholder="Last Name"/>
              <input type="text" name="sId1" placeholder="Student ID Number"/>
            </td>
          </tr>
          <tr>
            <td>
              <select name="skill1">
                <option value="skill level" 
                        disabled selected>Skill Level</option>
                <option name="skill1" value="1">Beginner</option>
                <option name="skill1" value="2">Intermediate</option>
                <option name="skill1" value="3">Pre-Advanced</option>
                <option name="skill1" value="4">Advanced</option>
              </select>
              <select name="inst1">
                <option value="Instrument" disabled selected>Instrument</option>
                <option name="inst1" value="1">Piano</option>
                <option name="inst1" value="2">Voice</option>
                <option name="inst1" value="3">String</option>
                <option name="inst1" value="4">Organ</option>
                <option name="inst1" value="5">Other</option>
              </select> 
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td><hr/>Location<hr/></td>
          </tr>
          <tr>
            <td>
              <select name="location">
                <option value="slot"disabled selected>Building Name</option>
                <option name="time" value="1">Hinkley</option>
                <option name="time" value="2">Kirkham</option>
                <option name="time" value="3">Manwaring Center</option>
                <option name="time" value="4">Snow</option>
                <option name="time" value="5">Spori</option>
              </select>
              <input type="text" name="room" placeholder="Room #" size = "5"/>
            </td>
          </tr>
          <tr>
            <td>
              <select name="time">
                <option value="time slot"disabled selected>Time Slot</option>
                <option name="time" value="1">9:00 AM</option>
                <option name="time" value="2">9:30 AM</option>
                <option name="time" value="3">10:00 AM</option>
                <option name="time" value="4">10:30 AM</option>
                <option name="time" value="5">11:00 AM</option>
                <option name="time" value="6">11:30 AM</option>
                <option name="time" value="7">12:00 PM</option>
                <option name="time" value="8">12:30 PM</option>
                <option name="time" value="9">1:00 PM</option>
                <option name="time" value="10">1:30 PM</option>
                <option name="time" value="11">2:00 PM</option>
                <option name="time" value="12">2:30 PM</option>
                <option name="time" value="13">3:00 PM</option>
              </select>
            </td>
          </tr>
        </table>
        <input type="submit" value="Register Student"/>
        <input type="reset" value="Clear Form"/>
      </form>
    </div>
      <div id="registered">
      </div>
      <?php
    if (isset($_POST["fName"]))
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
         $name = $_POST["fName"];
         if (isset($_POST["fName"]))
            $name = $_POST["fName"] . ' ' . $_POST["lName"];
         $sId = $_POST["sId"];
         $skill = $_POST["skill"];
         $inst = $_POST["inst"];
         $roomId = "1";
         $timeS = $_POST["time"];
         $passW = "student";
         $userN = $_POST["fName"];
         $nId = $_POST["fName"];
         $pType = $_POST["pType"];
         
         // insert student
         $db = $pdo->prepare("INSERT INTO Student (name, studentNum, username, password) VALUES (:name,:num, :user,:pass)");
         $db->bindValue(':name', $name, PDO::PARAM_STR);
         $db->bindValue(':num', $sId, PDO::PARAM_INT);
         $db->bindValue(':user', $userN, PDO::PARAM_STR);
         $db->bindValue(':pass', $passW, PDO::PARAM_STR);
         $db->execute();
         
         // get new id
         $db = $pdo->prepare("SELECT Student.id FROM Student WHERE Student.name=:name");
         $db->bindParam(':name', $name);
         $db->execute();
         $rows = $db->fetchAll(PDO::FETCH_NUM);
         if(count($rows))
         {
            foreach($rows as $row)
            {
               $nId = $row[0];
            }
         }
         else
            print 'No record for ' . $name;
         // insert performance
         $db = $pdo->prepare("INSERT INTO Performance (studentId, skillId, instrumentId, typeId, roomId, timeId) 
         VALUES (:nId,:skill, :inst,:type, :room, :time)");
         $db->bindValue(':nId', $nId, PDO::PARAM_INT);
         $db->bindValue(':skill', $skill, PDO::PARAM_INT);
         $db->bindValue(':inst', $inst, PDO::PARAM_INT);
         $db->bindValue(':type', $pType, PDO::PARAM_INT);
         $db->bindValue(':room', $roomId, PDO::PARAM_INT);
         $db->bindValue(':time', $timeS, PDO::PARAM_INT);
         $db->execute();
        // $rows = $db->fetchAll(PDO::FETCH_NUM);
     //    if(count($rows))
       //  {
           // foreach($rows as $row)
            //{
            //   print '<b>' . $row[0] . '</b>' . '<br/>' . $row[1] . 
            //   '<br/>' . $row[2] . ' ' . $row[3] . 
            //   '<br/>' . $row[4] . ' ' . $row[5] . '<br/>' . date("H:i ",strtotime($row[6])) . '<br/>';
           // }
         //}
        // else
        //    print 'No record for ' . $name;
         //print '</div>';
      }
    ?>
  </body>
</html>
