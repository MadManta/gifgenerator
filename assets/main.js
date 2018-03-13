
var searchTerms = [
    "garden",
    "cinemagraph",
    "greenery",
    "raining",
    "thunderstorm",
    "purring",
    "sunbathe",
    "waves",
    "wind",
    "clouds",
    "music notes"
]

for (var j = 0; j < searchTerms.length; j++) {

    var newButton = $("<button class='design btn btn-outline-success' type='button' data-id='" + searchTerms[j] + "'>" + searchTerms[j] + "</button>");
    
    $("#newbuttons").append(newButton);

};

$("#submit").on("click", function() {
    event.preventDefault();
    searchTerms.push($("#searchterm").val());
    $("#newbuttons").append($("<button class='design btn btn-outline-success' type='button' data-id='" + $("#searchterm").val() + "'>" + $("#searchterm").val() + "</button>"));
    a.attr('class', 'design', 'btn', 'btn-outline-success');    
});

$(document).on("click", ".design", function() {
    $("#images").empty();

    var searchItem = $(this).data("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=PXfsRap9Fu8oEu7BsafaReX38eZ3f077&limit=10&q=" + searchItem;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {

        var results = response.data;


        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var searchImage = $("<img class='loaded' data-state='still'>");
                var stillURL = results[i].images.fixed_height_still.url;
                var animateURL = results[i].images.fixed_height.url;
                searchImage.attr("data-still", stillURL);
                searchImage.attr("data-animate", animateURL);
                searchImage.attr("src", results[i].images.fixed_height_still.url);

                var p = $("<p>").text("Rating: " + rating);
                
                gifDiv.append(searchImage);
                gifDiv.append(p);

                $("#images").append(gifDiv);

            }
        };

        
    });


});

$(document).on("click", ".loaded", function() {
    var state = $(this).attr("data-state");
    if (state === "animate") {
        $(this).attr("data-state","still");
        $(this).attr("src", $(this).attr("data-still"));
      } else {
        $(this).attr("data-state","animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }
  });

