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
              $('.upcoming').append('<div class="col-md-1 poster" id="'+i+'"><img src="'+upcomingMovie[i].posters.profile+'"><p>'+upcomingMovie[i].title+'</p></div>');
            }
            
                 $('.poster').on('click', function(e) {
                   e.preventDefault();
                    $('.poster').removeClass('active');
                    $(this).addClass('active');
                });
        });
    };
    
    function PostSearch(){
      $('#popUpDiv').children().remove();
      var terms = document.getElementById("query").value;
      if(terms===''){
        alert("please enter something in the serach field")
      }else{
        popup('popUpDiv');
        $.getJSON("/search/" + terms)
        .done(function (data) {
          var movies = data.movies
          for(var i=0;i<movies.length;i++){
            $('#popUpDiv').append('<div ><img src="'+movies[i].posters.profile+'"><a onclick="popup("popUpDiv")">'+movies[i].title+'</a></div>')

          }

        });
      }
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

  



