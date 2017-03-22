<!DOCTYPE html>
<html>
<head>
    <title>Camagru</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/public/css/camagru.css">
</head>
<body>
    <div class="nav-bar">
        <ul>
            <li><a href="/">Camagru</a></li>
            <?php if ($_SESSION['username']){ ?> <li><a href="/logout" style="float:right;">Log out</a></li> <?php } ?>
            <?php if ($_SESSION['username']){ ?> <li><a href="/gallery" style="float:right;">Gallery</a></li> <?php } ?>
        </ul>
    </div>
    <p id="message"></p>
    <?php
    if ($error !== null || $valid !== null){
        echo "<div class='{$class}'>";
        echo ($error !== null) ? $error : $valid;
        echo "</div>";
    }
    ?>
    <div id="content"><?php include($content) ?></div>
</body>
</html>
