
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '448614558647520',
      xfbml      : true,
      version    : 'v2.3'
    });
  };

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=448614558647520&version=v2.3";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//     var obj = {method: 'feed', 
//     link: 'http://www.myusic.com/DailyPosts/Tina_Munim.html', 
//     picture: 'http://www.myusic.com/DailyPosts/Tina_Munim.jpg', 
//     name: 'Tina Munim', 
//     caption: 'Explore, Discover, Share...', 
//     description: 'Some description', 
//     actions: action_links, 
//     from: '196053677086787' 
//     }; 
    
//   $('.userActions').click(function(){
//     FB.ui(obj, callback);
//   }) ;
    
function postToFeed() { //Facebook Share Function
  // calling the API ...
  var obj = {
    method: 'feed',
    link: "http://www.facebook.com/pages/<?php echo $fbp_name; ?>/<?php echo $fbp_id; ?>?sk=app_xxxxx",
    picture: "http://www.compibot.com/<?php echo $image_folder;  ?>/<?php echo $event_info[4]; ?>",
    name: "<?php echo $event_info[1]; ?>",
    caption: '<?php echo "Expires in: " . $mdy_expiry; ?>',
    description: "<?php echo $event_info[2]; ?>",
    actions: [{ name: 'Vote', link: 'https://www.facebook.com/<?php echo $fbp_id ?>'}]
  };

  function callback(response) {
    addScore("<?php echo $event_table; ?>", "fbshare_point");
    $("#fb_share").addClass("success");
  }
  FB.ui(obj, callback);
}

 