$(document).ready(function(){

   
      $('body').css({"background-image":"url(http://wallpapersko.com/wp-content/uploads/2014/08/avengers-movie-wallpaper.jpg)"});
   
    Upcoming();
    FeatureTrailer();

 });
 
var upcomingMovie = [];
var currentMovie = "";
var imdb = "";
var j= 0;
var movieList = [];
var found;


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
            currentMovie = upcomingMovie[index];
            IMDBtrailer(imdb);
        });
      });
    }
    
  function AppendInfo(){
    $('.viewTrailer').children().remove();
    $('.viewTrailer').append('<h3><strong>'+currentMovie.title+'</strong></h3>');
    $('.viewTrailer').append('<h1><strong>"Sorry (wo)man, we could not find the trailer for this movie."</strong></h1>');
    $('.viewTrailer').append('<p style="text-align:justify">'+currentMovie.synopsis+'</p>');
    $('.viewTrailer').append('<input type="button"  id="addList" value="Add" onclick="CheckDB();" /><br><br>');
  }

  function IMDBtrailer(imdb) {
    $('.viewTrailer').children().remove();
    console.log(imdb)
    $.getJSON("/mytrailer/" + imdb)
    .done(function (data) {
      LoadTrailer(data);
      if(currentMovie.synopsis){
        $('.viewTrailer').append('<p style="text-align:justify">'+currentMovie.synopsis+'</p>'); }
        $('.viewTrailer').append('<input type="button"  id="addList" value="Add" onclick="CheckDB();" /><br><br>');
    })
    .fail(function(data) {
      AppendInfo();
    })
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
          $('#a'+i+'').append('<img class="poster-search" src="'+movies[i].posters.profile+'"><p class="p-title">'+movies[i].title+'</p>')   
        }
          $('.movie-link').on('click', function(e) {
            e.preventDefault();
            var index = $(this).attr('id').replace(/a/,'')
            currentMovie = movies[index];
            console.log(movies[index].alternate_ids)
              if (movies[index].alternate_ids === undefined){
                AppendInfo();
              } else {
                imdb = movies[index].alternate_ids.imdb;
                IMDBtrailer(imdb);
              }
          });
      });
      }
    };

  function Remove(id) {
    $('#'+id+'').remove();
    var movie = $.grep(movieList, function(e){ return e.id == id; });
    movieList.splice(movie[0],1);
  };

  function DoubleCheck(movie){
    for(var i = 0; i < movieList.length; i++) {
      if (movieList[i].title == movie.title) {
        found = true;
      break;
      }
    }
  };

  function CheckDB(){
    found = false;
    $.getJSON("/movie_list/" + currentMovie.title)
      .done(function (data) {
        if(data === true){
          found = true}
          AddList();
      });
  }

  function UpdateList(){
    for (var i=0;i<movieList.length;i++){
      $.ajax({
        url: "/add/" + movieList[i].title,
        type: "GET",
        success: function(data,status){
          for (var z=0;z<movieList.length;z++){
            Remove(movieList[z].alternate_ids.imdb)
          }
        }
      })
    }
    setTimeout(function() {
    $('.myList').children().remove();
    $('.myList').append("<p>You've successfully added these movies to your Movie Jam list to view later.</p><a href='/moviejams'><p>Click here to go to your Movie Jam page.</p></a>");
  }, 1000);
  }

  function AddList() {
    DoubleCheck(currentMovie)
    if (found === true){
      alert("This movie has already been added to your list.")}
      else{
    $('.myList').children().remove();
    $('.myList').append('<input type="button" class="update" value="Update" onclick="UpdateList();"/>');
    movieList.push(currentMovie);
    $('#addList').remove();
    $('.viewTrailer').append('<p>You have successfully added this movie to your list, please click "update" to save them.</p>');
      for(var i=0;i<movieList.length;i++){
        $('.myList').append('<li id="'+movieList[i].id+'">'+movieList[i].title+'  <input type="button"  class="remove" value="X"/></li>');
          $('.remove').off('click');
          $('.remove').on("click",function(e){
            e.preventDefault;
            Remove($(this).parent().attr("id"));
          })
      }}
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
