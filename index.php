<html>
<body>
<p>The following presentations are currently available:</p>
<ul>
<?php
foreach (glob("*/index.html") as $filename) {    
    $folder = strstr($filename, '/', true);
?>
  <li>
    <a href="./<?=$filename?>"><?=$folder?></a>
   </li>
<?php
}
?>
</ul>
</body>
</html>