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
    
    function Upcoming(){
      $('.upcoming').children().remove();
      $.ajax({
        url: '/upcoming',
        type: 'GET',
        dataType: 'json',
        success: function(data,status){
          console.log(data["movies"][0].posters.thumbnail);
          var movies = shuffle(data["movies"]);
          for(var i=0;i<8;i++){
          $('.upcoming').append('<div class="poster" id="'+ movies[i].title +'"><img src="'+movies[i].posters.thumbnail+'" id="'+movies[i].ratings.critics_score+'class="'+ movies[i].alternate_ids.imdb +'"></div>');
        }}
      });
    };
    
    function PostSearch(){
      $('.mySearch').children().remove();
      $('.mySearch').append('<p>Coming Soon!</p>'); 
    };

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex){

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




