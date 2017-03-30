
<h3 style="Width:100%;color:white;">Filters</h3>
<div id="filters">
  <ul class="photoList scrollbar">
    <li>
      <img src="public/filters/thug1.png" name="thug1" class="photo" style="height:auto;">
    </li>
    <li>
      <img src="public/filters/thug2.png" name="thug2" class="photo" style="height:auto;">
    </li>
    <li>
      <img src="public/filters/thug3.png" name="thug3" class="photo" style="height:auto;">
    </li>
    <li>
      <img src="public/filters/thug4.png" name="thug4" class="photo" style="height:auto;">
    </li>
  </ul>
</div>
<div id="firstaction" style="width:100%; text-align: center;">
    <div><div id="video_container"><video id="video"></video></div></div>
    <button id="startbutton" type="button" style="width:30%;">Take a picture</button>
    <button id="fileupload" type="button" class="active" style="width:30%;">
      <input type="file" style="display:none;" id="fileinput" />
      Upload a file
    </button>
  </div>
<div id="secondaction" style="width:100%; text-align: center; display:none;">
    <div><canvas id="canvas"></canvas></div>
    <button id="cancel" type="button" class="button_error" style="width:30%;">Cancel</button>
    <button id="upload" type="button" style="width:30%;">Upload a picture</button>
</div>
<h3 style="Width:100%;color:white;">Your Pictures</h3>
<ul id="photoList" class="scrollbar photoList" <?php if (!$photos) echo "style='display: none;'" ?> >
<?php
	if ($photos){
		foreach($photos as $photo){
			echo "<li><img class='photo' src='./public/upload/".$photo["name"].".png'>";
			echo '<div class="top">';
    		echo '<a href="/comment/'.$photo["name"].'"><button type="button">Comment</button></a>';
    		echo '</div>';
    		echo '<div class="bottom">';
    		echo '<button type="button" class="button_error delete_photo" name="'.$photo["name"].'.png">Delete</button>';
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
<script type="text/javascript" src="/public/js/main.js"></script>
