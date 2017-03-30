<div style="width:100%; text-align: center;">
    <img class='photo' src='/public/upload/<?php echo $params["name"]?>.png'><br/>
    <button type="button" id="like" style="width:20%;"></button>
    <label id="like_label" style="margin-left:20px; font-size:1em; color:cyan; font-style: italic;"></label>
</div>
<div id="comments" class="scrollbar scrollbar-min">
</div>
<div>
  <form><textarea id="comment" name="comment" placeholder="Comment..."></textarea><button type="button" id="send">Send comment</button></form>
</div>
<script type="text/javascript" src="/public/js/message.js"></script>
<script type="text/javascript" src="/public/js/form.js"></script>
<script type="text/javascript" src="/public/js/ajax.js"></script>
<script type="text/javascript" src="/public/js/comments.js"></script>
