$(document).ready(function(){
        
        //Upcoming();
        LoadTrailer();
        
 });

    function LoadTrailer() {
      $('.viewTrailer').children().remove();
 
      $.getJSON("/trailer")
      .done(function (data) {
              $('.viewTrailer').append('<h3>Trailer - '+data.title+'</h3>');
              $('.viewTrailer').append('<p><iframe width="640" height="390" src="http://v.traileraddict.com/'+data.trailer_id+
              '?autoplay=1" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" frameborder="1"></iframe></p>');
         });  
    }; 
    
    function Upcoming(){
      $('.upcoming').children().remove();
      $('.upcoming').append('<p>Coming Soon!</p>');
    };
    
    function PostSearch(){
      $('.mySearch').children().remove();
      $('.mySearch').append('<p>Coming Soon!</p>'); 
    };




