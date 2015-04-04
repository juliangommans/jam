$(document).ready(function(){

    Upcoming();
    FeatureTrailer();
        
 });
 
var upcomingMovie = [];
var searchedMovies = [];
var imdb = "";


    function FeatureTrailer() {
        $('.viewTrailer').children().remove();
 
        $.getJSON("/trailer")
          .done(function (data) {
              LoadTrailer(data);
          });  
    }
    
    function LoadTrailer(data) {
        $('.viewTrailer').children().remove();
   
        $('.viewTrailer').append('<h3><strong>'+data.title+'</strong></h3>');
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
              $('.upcoming').append('<div class="col-md-1 poster thisone" id="'+i+'"><img src="'+upcomingMovie[i].posters.profile+'"><p>'+upcomingMovie[i].title+'</p>');
            }
        
         $('.poster').on('click', function(e) {
           e.preventDefault();
           $('.poster').removeClass('active');
           $(this).addClass('active');
           var index = $(this).attr('id');
          
           if($('.poster:has(.thisone)')) {
               imdb = upcomingMovie[index].alternate_ids.imdb;
               IMDBtrailer(imdb,upcomingMovie[index].synopsis );
           }
           else{
               imdb = searchedMovies[index].alternate_ids.imdb;
               IMDBtrailer(imdb,searchedMovies[index].synopsis );
           }
        });
      });
    }
    
    function IMDBtrailer(imdb, synopsis) {
        $('.viewTrailer').children().remove();
 
        $.getJSON("/mytrailer/" + imdb)
          .done(function (data) {
              LoadTrailer(data);
               $('.viewTrailer').append('<p style="text-align:justify">'+synopsis+'</p>');
          });  
  }
    
    
    function PostSearch(){
        var terms = $('#query').val();
        $('#query').val();
        $('.mySearch').children().remove();

        if (terms === "" || terms === null) {
            alert('Please enter a valid search item!');
        }
        else {
            $(function () {
                $.getJSON( "/search/")
                  .done(function (data) {
                    alert(data);
            //           searchedMovies = [];
            //           var movies = data.movies;
            //       for(var j = 0; j < movies.length; j++){
            //           searchedMovies[j] = movies[j];
            //           $('.mySearch').append('<div class="col-md-1 poster" id="'+j+'"><img src="'+searchedMovies[j].posters.profile+'"><p>'+searchedMovies[j].title+'</p>');
            //         }
                     
            // $('.poster').on('click', function(e) {
            //     e.preventDefault();
            //     $('.poster').removeClass('active');
            //     $(this).addClass('active');
            //     var index = $(this).attr('id');
            //     imdb = searchedMovies[index].alternate_ids.imdb;
            //     IMDBtrailer(imdb,searchedMovies[index].synopsis );
            // });
          });
       });
      }
    }


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

