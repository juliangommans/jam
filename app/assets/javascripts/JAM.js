$(document).ready(function(){

    Upcoming();
    FeatureTrailer();
        
 });
 
var upcomingMovie = [];
var searchedMovies = [];
var trailerID = "";
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
              $('.upcoming').append('<div class="col-md-1 poster" id="'+i+'"><img src="'+upcomingMovie[i].posters.profile+'"><p>'+upcomingMovie[i].title+'</p>');

            }
                 $('.poster').on('click', function(e) {
                   e.preventDefault();
                    $('.poster').removeClass('active');
                    $(this).addClass('active');
                    var index = $(this).attr('id');
                    imdb = upcomingMovie[index].alternate_ids.imdb;
                    IMDBtrailer(imdb,upcomingMovie[index].synopsis );
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
            alert('Please enter a valid search item!')
        }
        else {
            $(function () {
                $.getJSON( "/search/" + terms)
                  .done(function (data) {
                      searchedMovies = [];
                      var movies = data.movies
                   for(var i=0;i<movies.length;i++){
                       searchedMovies[i] = movies[i] 
                       $('.mySearch').append('<div class="col-md-1 poster" id="'+i+'"><img src="'+upcomingMovie[i].posters.profile+'"><p>'+upcomingMovie[i].title+'</p>');
                     }
        });
    }

      // $('.movie-link').children().remove();
      // var terms = document.getElementById("query").value;
      // if(terms===''){
      //   alert("please enter something in the search field")
      // }else{
      //   popup('popUpDiv');
      //   $.getJSON("/search/" + terms)
      //   .done(function (data) {
      //     searchedMovies = [];
      //     var movies = data.movies
      //     for(var i=0;i<movies.length;i++){
      //       searchedMovies[i] = movies[i] 
      //       $('#a'+i+'').append('<img src="'+movies[i].posters.profile+'"><p>'+movies[i].title+'</p>')   

      //     }
      //       $('.movie-link').on('click', function(e) {
      //             e.preventDefault();
      //               var index = $(this).attr('id').replace(/a/,'')
      //               console.log(index)
      //               imdb = movies[index].alternate_ids.imdb;
      //               IMDBtrailer(imdb);
      //         });
      //   });
      //}



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

