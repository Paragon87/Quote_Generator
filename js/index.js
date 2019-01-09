$(document).ready(function() {
  var quoteText = "";
  var qAuthor = "";
  
  //Function to retrieve a quote.
  function newQuote() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      method: "getQuote",
      lang: "en",
      format: "jsonp"
    }
  })
  .done(function(resp) {
    quoteText = resp.quoteText;
    if (!resp.quoteAuthor) {
      qAuthor = "Anon";
    } else {
      qAuthor = (resp.quoteAuthor);
    }
    $("#aText").html(qAuthor);
    $("#qText").html(quoteText);
  })
  .fail(function(err) {
    console.log("Error: " + err.status);
    $("#qText").html("Something happened....Give it another shot!");
  });
}
  
  newQuote();//Load a quote on page load.
  
  $(".btn-next").on("click", newQuote);//Load a quote on button click.

  //Tweet quote.
  $(".tweetBtn").on("click", function() {
    var twt = "http://twitter.com/intent/tweet?text=" + encodeURIComponent(quoteText + " -" + qAuthor);
    window.open(twt, "_blank");    
  });
  
  $(".btn-next").hover(function() {
    $(this).css("background-color", "grey");
  }, function() {
    $(this).css("background-color", "lightblue");
  });
  
  $(".tweetBtn").hover(function(){
    $(this).css("background-color", "grey");
  }, function() {
    $(this).css("background-color", "lightblue");
  });
  
});