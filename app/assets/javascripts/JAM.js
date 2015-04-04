$(document).ready(function(){

    Upcoming();
    FeatureTrailer();
        
 });
 
var upcomingMovie = [];
var currentMovie = "";
var imdb = "";
var j= 0;


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
              else { $('.viewTrailer').append('<p style="text-align:justify">'+currentMovie.Plot+'</p>'); }
            $('.viewTrailer').append('<input type="button"  id="addList" value="Add" onclick="AddList();" /><br><br>')
          });  
  }
    
    
    function PostSearch(){
        var terms = $('#query').val();
        $('.mySearch').children().remove();
        $('#query').val("");
        if (terms === "" || terms === null) {
            alert('Please enter a valid search item!');
        }
        else {
            $(function () {
                $.getJSON( "http://www.omdbapi.com/?t="+terms+"&y=&plot=short&r=json")
                  .done(function (data) {
                        $('.mySearch').append('<h3 style="color:blue"><strong>'+data.Title+'</strong></h3>') 
                        $('.mySearch').append('<li>'+data.Year+'</li>');
                        $('.mySearch').append('<li>'+data.Plot+'</li>');
                        $('.mySearch').append('<li>'+data.imdbRating+'</li>');
                        //$('.mySearch').append('<br><img src="'+data.Poster+'">');
                        $('.mySearch h3').on('click', function() {
                            currentMovie = data;
                            var imdbN = (data.imdbID).substring(2);
                            IMDBtrailer(imdbN);
                        });
                  });
            });
        }
    }

    function AddList() {
        if(currentMovie.title){
            $('.myList').append('<li id='+j+'>'+currentMovie.title+'  <input type="button"  id="remove" value="X" onclick="Remove();" /></li>'); }
        else { $('.myList').append('<li id='+j+'>'+currentMovie.Title+'  <input type="button"  id="remove" value="X" onclick="Remove();" /></li>'); }

    }
    
    function Remove() {
        $('#remove').click(function(){
            $(this).closest('li').remove();
        });

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

