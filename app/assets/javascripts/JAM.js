$(document).ready(function(){

    Upcoming();
    FeatureTrailer();
        
 });
 
var trailerID = ""; 
var upcomingMovie = [];
var imdb = "";
var searchedMovies = [];

    function FeatureTrailer() {
        $('.viewTrailer').children().remove();
 
        $.getJSON("/trailer")
          .done(function (data) {
              LoadTrailer(data);
          });  
    }
    
    function LoadTrailer(data) {
        $('.viewTrailer').children().remove();
   
        $('.viewTrailer').append('<h3>Trailer - '+data.title+'</h3>');
        $('.viewTrailer').append('<p><iframe width="640" height="390" src="http://v.traileraddict.com/'+data.trailer_id+
        '?autoplay=1" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" frameborder="1"></iframe></p>');
    }
    
    function Upcoming() {
      $('.upcoming').children().remove();
      $.getJSON("/upcoming")
        .done(function (data) {
          shuffle(data.movies);
          upcomingMovie = [];
            for(var i = 0; i < 10; i++){
               upcomingMovie[i] = data.movies[i];
              $('.upcoming').append('<div class="col-md-1 poster" id="'+i+'" data-tooltip="#tip'+i+'"><img src="'+upcomingMovie[i].posters.profile+'"><p>'+upcomingMovie[i].title+'</p></div>'+
                      '<div class="synopsis" id=tip'+i+'">'+upcomingMovie[i].synopsis+'</div>');
                      $('.synopsis').hide();
            }
                 $('.poster').on('click', function(e) {
                   e.preventDefault();
                    $('.poster').removeClass('active');
                    $(this).addClass('active');
                    var index = $(this).attr('id');
                    imdb = upcomingMovie[index].alternate_ids.imdb;
                    IMDBtrailer(imdb);
                });
                            
                $('.poster').on('mouseover','.synopsis', function(e) {
                      $(this).css({left: e.pageX + 1, top: e.pageY + 1})
                            .stop().show(100); }, 
                      function() { $(this).hide();  });
        });
    }
    
    function IMDBtrailer(imdb) {
        $('.viewTrailer').children().remove();
 
        $.getJSON("/mytrailer/" + imdb)
          .done(function (data) {
              LoadTrailer(data);
          });  
  }
    
    
    function PostSearch(){

      $('.movie-link').children().remove();
      var terms = document.getElementById("query").value;
      if(terms===''){
        alert("please enter something in the search field")
      }else{
        popup('popUpDiv');
        $.getJSON("/search/" + terms)
        .done(function (data) {
          searchedMovies = [];
          var movies = data.movies
          for(var i=0;i<movies.length;i++){
            searchedMovies[i] = movies[i] 
            $('#a'+i+'').append('<img src="'+movies[i].posters.profile+'"><p>'+movies[i].title+'</p>')   

          }
            $('.movie-link').on('click', function(e) {
                   e.preventDefault();
                    var index = $(this).attr('id').replace(/a/,'')
                    console.log(index)
                    imdb = movies[index].alternate_ids.imdb;
                    IMDBtrailer(imdb);
              });
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

  



