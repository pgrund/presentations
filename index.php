<html>
<body>
<p>The following presentations are currently available:</p>
<ul>
<?php
foreach (glob("*/index.html") as $filename) {
    $folder = substr($filename, 0, strpos($filename, '/'));
    echo "<li><a href='./$filename'>$folder</a></li>";
}?>
</ul>
</body>
</html>