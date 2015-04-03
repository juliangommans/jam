$(document).ready(function(){
        Upcoming();
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
    
  var upcomingMovie = [];
  
    function Upcoming(){
      $('.upcoming').children().remove();
      $.getJSON("/upcoming")
        .done(function (data) {
          shuffle(data.movies);
          upcomingMovie = [];
            for(var i = 0; i < 10; i++){
               upcomingMovie[i] = data.movies[i];
              $('.upcoming').append('<div class="col-md-1" id="poster"><img src="'+upcomingMovie[i].posters.profile+'"><p>'+upcomingMovie[i].title+'</p></div>');
            }
        });
    };
    
    function PostSearch(){
      $('.mySearch').children().remove();
      $('.mySearch').append('<p>Coming Soon!</p>'); 
    };


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }




