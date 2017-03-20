<div id="firstaction" style="width:100%; text-align: center;">
    <video style=width:100%;"" id="video"></video>
    <button id="startbutton" type="button" style="width:50%;">Take a picture</button>
</div>
<div id="secondaction" style="width:100%; text-align: center; display:none;">
    <canvas id="canvas"></canvas><br/>
    <button id="cancel" type="button" class="button_error" style="width:50%; float:right;">Cancel</button>
    <button id="upload" type="button" style="width:50%;">Upload a picture</button>
</div>
<h3 style="Width:100%;color:white;">Your Pictures</h3>
<ul id="photoList" class="scrollbar" <?php if (!$photos) echo "style='display: none;'" ?> >
<?php
	if ($photos){
		foreach($photos as $photo){
			echo "<li><img class='photo' src='./public/upload/".$photo["name"].".jpeg'>";
			echo '<div class="top">';
    		echo '<a href="/comment/'.$photo["name"].'"><button type="button">Comment</button></a>';
    		echo '</div>';
    		echo '<div class="bottom">';
    		echo '<button type="button" class="button_error delete_photo" name="'.$photo["name"].'.jpeg">Delete</button>';
    		echo '</div>';
			echo "</li>";
		}
	}
?>
</ul>
<?php
	if (!$photos)
		echo "<p id='no_photo' style='width:100%;color:white;'>You haven't got any pictures yet</p>";
    else
        echo "<p id='no_photo' style='width:100%;color:white;display:none;'>You haven't got any pictures yet</p>";
?>
<!--<img src="http://placekitten.com/g/320/261" id="photo" alt="photo">-->
<script type="text/javascript" src="/public/js/message.js"></script>
<script type="text/javascript" src="/public/js/form.js"></script>
<script type="text/javascript" src="/public/js/ajax.js"></script>
<script type="text/javascript" src="/public/js/photo.js"></script>
<script type="text/javascript" src="/public/js/cam.js"></script>
