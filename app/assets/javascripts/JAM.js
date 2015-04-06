$(document).ready(function(){

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
    
  function IMDBtrailer(imdb) {
    $('.viewTrailer').children().remove();

    $.getJSON("/mytrailer/" + imdb)
      .done(function (data) {
         LoadTrailer(data);
         if(currentMovie.synopsis){
                $('.viewTrailer').append('<p style="text-align:justify">'+currentMovie.synopsis+'</p>'); }
        $('.viewTrailer').append('<input type="button"  id="addList" value="Add" onclick="AddList();" /><br><br>')
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
                    imdb = movies[index].alternate_ids.imdb;
                    currentMovie = movies[index];
                    IMDBtrailer(imdb);
              });
        });
      }
    };
    // function PostSearch(){
    //     var terms = $('#query').val();
    //     $('.mySearch').children().remove();
    //     $('#query').val("");
    //     if (terms === "" || terms === null) {
    //         alert('Please enter a valid search item!');
    //     }
    //     else {
    //         $(function () {
    //             $.getJSON( "http://www.omdbapi.com/?t="+terms+"&y=&plot=short&r=json")
    //               .done(function (data) {
    //                     $('.mySearch').append('<h3 style="color:blue"><strong>'+data.Title+'</strong></h3>') 
    //                     $('.mySearch').append('<li>'+data.Year+'</li>');
    //                     $('.mySearch').append('<li>'+data.Plot+'</li>');
    //                     $('.mySearch').append('<li>'+data.imdbRating+'</li>');
    //                     //$('.mySearch').append('<br><img src="'+data.Poster+'">');
    //                     $('.mySearch h3').on('click', function() {
    //                         currentMovie = data;
    //                         var imdbN = (data.imdbID).substring(2);
    //                         IMDBtrailer(imdbN);
    //                     });
    //               });
    //         });
    //     }
    // }

  function Remove(id) {
    $('#'+id+'').remove();
    var movie = $.grep(movieList, function(e){ return e.alternate_ids.imdb == id; });
    movieList.splice(movie[0],1);
  };

  function doubleCheck(){
    found = false;
    for(var i = 0; i < movieList.length; i++) {
      if (movieList[i].title == currentMovie.title) {
        found = true;
      break;
    }}
  };

  function UpdateList(){

    $.ajax({
      url: "/add",
      type: "POST",
      datatype: "json",
      data: movieList
      .done(function (data) {
        movieList = [];
        window.location = "http://localhost:3000/moviejams"
      })
    })
  }

  function AddList() {
    doubleCheck()
    console.log(currentMovie)
    if (found === true){
      alert("This movie has already been added to your list.")}
      else{
    $('.myList').children().remove();
    $('.myList').append('<input type="button" class="update" value="Update" onclick="UpdateList();"/>');
    movieList.push(currentMovie);
    $('#addList').remove();
    $('.viewTrailer').append('<p>You have successfully added this movie to your list, please click "update" to save them.</p>');
      for(var i=0;i<movieList.length;i++){
        $('.myList').append('<li id="'+movieList[i].alternate_ids.imdb+'"><img src="'+movieList[i].posters.profile+'">'+movieList[i].title+'  <input type="button"  class="remove" value="X"/></li>');
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


