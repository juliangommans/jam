var upcomingMovie = [];
var currentMovie;
var imdb = "";
var j= 0;
var movieList = [];
var found;
var movie;


    function FeatureTrailer() {
      $('.viewTrailer').children().remove();
      $.getJSON("/trailer")
        .done(function (data) {
          LoadTrailer(data);
        });  
    }
    
    function LoadTrailer(data) {
      debugger
      $('.viewTrailer').children().remove();
      $('.viewTrailer').append('<h2><strong>'+data.title+'</strong></h2>');
      $('.viewTrailer').append('<p><iframe width="640" height="390" src="http://v.traileraddict.com/'+data.trailer_id+
      '?autoplay=1" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" frameborder="1"></iframe></p>');
    }
    
    function Upcoming() {
      $('.upcoming').children().remove();
      $.getJSON("/index/upcoming")
        .done(function (data) {
          shuffle(data);
          upcomingMovie = [];
          for(var i = 0; i < 10; i++){
               upcomingMovie[i] = data[i];
              $('.upcoming').append('<div class="col-md-1 poster" id="'+i+'"><img src="'+upcomingMovie[i].poster+'"><p>'+upcomingMovie[i].title+'</p>');
            }
         $('.poster').on('click', function(e) {
           e.preventDefault();
           $('.poster').removeClass('active');
           $(this).addClass('active');
           var index = $(this).attr('id');
            imdb = upcomingMovie[index].imdb;
            currentMovie = upcomingMovie[index];
            IMDBtrailer(imdb);
        });
      });
    }
    
  function AppendInfo(){
    $('.viewTrailer').children().remove();
    $('.viewTrailer').append('<h3><strong>'+currentMovie.title+'</strong></h3>');
<<<<<<< HEAD
    $('.viewTrailer').append('<h1><strong>"We could not find the trailer for this movie."</strong></h1>');
=======
    $('.viewTrailer').append('<h1 id="missing"><strong>"Sorry (wo)man, we could not find the trailer for this movie."</strong></h1>');
>>>>>>> a62175c3b84a8c159fd7ee22464a7e83f0f7e6b9
    CurrentMoviePlot(currentMovie);
  }

  function CurrentMoviePlot(movie){
    $.getJSON("/find/" + movie.title)
      .done(function (data) {
        if (data.description == null){
          $('.viewTrailer').append('<p> Unfortunately we could not find a description for this movie</p>');
        } else {
          $('.viewTrailer').append('<p style="text-align:justify">'+data.description+'</p>');
        }
        $('.viewTrailer').append('<select id="movieScore" onchange="CheckDB(this.value);" ><option value="">Please Select One</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>');
      })
      // .fail(function(data) {
      //   $('.viewTrailer').append('<p> unfortunately we could not find a description for this movie</p>');
      //   $('.viewTrailer').append('<select id="movieScore" onchange="CheckDB(this.value);" ><option value="">Please Select One</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>');
      // })
  }
  
  function IMDBFeaturePage(imdb) {
    $('.viewTrailer').children().remove();
    $.getJSON("/mytrailer/" + imdb)
    .done(function (data) {
       $('.viewTrailer').append('<p>'+data.embed+'</p>')
    })
    .fail(function(data) {
      $('.viewTrailer').append('<h1><strong>"We could not find the trailer for this movie."</strong></h1>');
    })
  }

  function IMDBtrailer(imdb) {
    $('.viewTrailer').children().remove();
    $.getJSON("/mytrailer/" + imdb)
    .done(function (data) {
      LoadTrailer(data);
      CurrentMoviePlot(currentMovie);
    })
    .fail(function(data) {
      AppendInfo();
    })
  }
    
    
  function PostSearch(){
    $('.movie-link').children().remove();
    var terms = document.getElementById("query").value;
    if(terms === ''){
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
    
    if (id.alternate_ids.imdb === undefined){
      $('#'+id.imdb+'').remove();
      movie = $.grep(movieList, function(e){ return e.id == id; });
      movieList.splice(movie[0],1);
    } else {
      $('#'+id.alternate_ids.imdb+'').remove();
      movie = $.grep(movieList, function(e){ return e.id == id; });
      movieList.splice(movie[0],1);
    }
  };

  function DoubleCheck(movie){
    for(var i = 0; i < movieList.length; i++) {
      if (movieList[i].title == movie.title) {
        found = true;
      break;
      }
    }
  };

  function CheckDB(score){
    if (score === ""){
      alert("Please select a score before adding your movie")
    } else {
    found = false;
    $.getJSON("/movie_list/" + currentMovie.title)
      .done(function (data) {
        if(data === true){
          found = true}
          UserPreRating(score);
      });
    }
  } 

  function UserPreRating(score) {
    currentMovie["pre_rating"] = score
    $('#movieScore').remove();
    $('.viewTrailer').append('<input type="button"  id="addList" value="Add" onclick="AddList();" /><br><br>');
  }

  function UpdateList(){
    for (var i=0;i<movieList.length;i++){
      $.ajax({
        url: '/add/' + movieList[i].pre_rating +'/' +movieList[i].title,
        type: "GET",
        success: function(data,status){
              for (var z=0;z<movieList.length;z++){
                Remove(movieList[z])
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
    movieList.push(currentMovie);
    $('.viewTrailer input').remove();
    $('.myList').append('<br><input type="button" class="update" value="Update" onclick="UpdateList();"/>');
    $('.viewTrailer').append('<p>You have successfully added this movie to your (temporary) list, please click "update" to permanently save them.</p>');
      for(var i=0;i<movieList.length;i++){
        $('.myList').append('<li style="align:left" id="'+movieList[i].id+'">'+movieList[i].title+'<div class="remove">remove<div></li>');
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
