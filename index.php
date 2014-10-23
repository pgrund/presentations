<html>
<body>
<p>The following presentations are currently available:</p>
<ul>
<?php
foreach (glob("*/index.html") as $filename) {
    $folder = substr($filename, 0,strpos($filename, "/"));
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