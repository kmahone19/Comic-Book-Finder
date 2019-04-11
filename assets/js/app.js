// movie list variable 
var movies = [{
    name: "Captian America: The First Avenger",
    movieId: 1771
  },
  {
    name: "Captain Marvel",
    movieId: 299537
  },
  {
    name: "Iron Man",
    movieId: 1726
  },
  {
    name: "The Incredible Hulk",
    movieId: 1724
  },
  {
    name: "Iron Man 2",
    movieId: 10138
  },
  {
    name: "Thor",
    movieId: 10195
  },
  {
    name: "The Avengers",
    movieId: 24428
  },
  {
    name: "Iron Man 3",
    movieId: 68721
  },
  {
    name: "Thor: The Dark World",
    movieId: 76338
  },
  {
    name: "Captian America: The Winter Soilder ",
    movieId: 100402
  },
  {
    name: "Gaurdians of the Galaxy",
    movieId: 118340
  },
  {
    name: "Gaurdians of the Galaxy Vol. 2",
    movieId: 283995
  },
  {
    name: "Avengers: Age of Ultron",
    movieId: 99861
  },
  {
    name: "Ant-Man",
    movieId: 102899
  },
  {
    name: "Captain America: Civil War",
    movieId: 271110
  },
  {
    name: "Spider-Man: Homecoming",
    movieId: 315635
  },
  {
    name: "Doctor Strange",
    movieId: 284052
  },
  {
    name: "Thor: Ragnarok",
    movieId: 280453
  },

  {
    name: "Black Panther",
    movieId: 284052
  },
  {
    name: "Avengers: Infinity War",
    movieId: 299536
  },
  {
    name: "Ant-Man and The Wasp",
    movieId: 363088
  },
];

// makes all the buttons for the movies
function makeBtns() {
  $("#movie-buttons").empty();

  for (var i = 0; i < movies.length; i++) {
    var $movieBtn = $("<button>");
    $movieBtn
      .attr("data-name", movies[i].name)
      .attr("data-id", movies[i].movieId)
      .attr("id", "movie-btn")
      .attr("class", "btn")
      .text(movies[i].name);
    $("#movie-buttons").append($movieBtn);
  }
}

// when a movie button is clicked....
$(document).on("click", "#movie-btn", function () {
  // the character dump is epmtied and the movie id is grabed and passed to the url
  $("#character-dump").empty();
  var movie = $(this).attr("data-id");
  var movieQueryURL = "https://api.themoviedb.org/3/movie/" + movie + "/credits?api_key=d6abfcd6eaf4d9a26a2d1b693349854f";

  // run the ajax event
  $.ajax({
    url: movieQueryURL,
    method: "GET"
  }).then(function (response) {
    // with the response check for the avengers movie ids to print a large number of characters
    if (movie === 24428 || movie === 299536 || movie === 99861) {
      for (var i = 0; i < 35; i++) {
        var characterDiv = $("<div>")
          .attr("class", "row mb-2");
        var characterP = $("<span>");
        var characterBtn = $("<button>");
        characterP.text(response.cast[i].name);
        characterBtn.text(response.cast[i].character)
          .attr("data-chatacter", response.cast[i].character)
          .attr("class", "mr-3 btn btn-outline-danger");
        characterDiv.append(characterBtn, characterP, );
        $("#character-dump").append(characterDiv);
      }
    } 
    // for all other movies print the first 20 characters
    else {
      for (var i = 0; i < 20; i++) {
        var characterDiv = $("<div>")
          .attr("class", "row mb-2");
        var characterP = $("<span>");
        var characterBtn = $("<button>");
        characterP.text(response.cast[i].name);
        characterBtn.text(response.cast[i].character)
          .attr("data-chatacter", response.cast[i].character)
          .attr("class", "mr-3 btn btn-outline-danger");
        characterDiv.append(characterBtn, characterP);
        $("#character-dump").append(characterDiv);
      }
    };
  })

})

// run make buttons on load
makeBtns();