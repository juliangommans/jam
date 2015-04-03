$(document).ready(function(){
        
        //Upcoming();
        LoadTrailer();
        
 });

var videoId = 81707;

    function LoadTrailer() {
<<<<<<< HEAD
      //$('.viewTrailer').children().remove();
    //  $('.viewTrailer').html('<p><iframe width="640" height="390 src="http://v.traileraddict.com/'+videoId+
     //     '?autoplay=1" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" frameborder="1"></iframe></p>');
          
           $('.viewTrailer').html("<p> hi</p>")
          
=======
      $('.viewTrailer').children().remove();
      $('.viewTrailer').append('<iframe width="640" height="390 src="http://v.traileraddict.com/'+videoId+
            '?autoplay=1" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" frameborder="1"></iframe>');
>>>>>>> 76bdcc000a61d19b6615f738f383c003071bc89a
    }; 
    
    function Upcoming(){
      $('.upcoming').children().remove();
      $('.upcoming').append('<p>Coming Soon!</p>');
    };
    
    function PostSearch(){
      $('.mySearch').children().remove();
      $('.mySearch').append('<p>Coming Soon!</p>'); 
    };




