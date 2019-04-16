// movie list variable with sub-objects for the info 
var movies = [{
    name: "Captain America: The First Avenger",
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
    name: "Captain America: The Winter Soilder ",
    movieId: 100402
  },
  {
    name: "Guardians of the Galaxy",
    movieId: 118340
  },
  {
    name: "Guardians of the Galaxy Vol. 2",
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
    movieId: 284053
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

  for (var i = 0; i < movies.length; i++) {
    var $movieBtn = $("<button>");
    $movieBtn
      .attr("data-name", movies[i].name)
      .attr("data-id", movies[i].movieId)
      .attr("id", "movie-btn")
      .attr("class", "btnHover btn btn-danger m-1 btnSize")
      .text(movies[i].name);
    $("#movie-buttons").append($movieBtn);
  }
}

// when a movie button is clicked....
$(document).on("click", "#movie-btn", function () {
  // the movie info is epmtied and the movie id is grabed and passed to the url
  $("#movie-info").empty();
  var movie = $(this).attr("data-id");
  var movieQueryURL = "https://api.themoviedb.org/3/movie/" + movie + "/credits?api_key=d6abfcd6eaf4d9a26a2d1b693349854f";

  // run ajax
  $.ajax({
    url: movieQueryURL,
    method: "GET"
  }).then(function (response) {
    
    // with the response check for the Avengers movie ids to print a larger number of characters
    if (movie = 24428 || movie == 299536 || movie == 99861) {
     
      for (var i = 0; i < 35; i++) {
        // variables to create new elements for each button and name 
        var characterDiv = $("<div>")
          .attr("class", "row mb-2");
        var characterP = $("<span>");
        var characterBtn = $("<button>");

        // a variable to hold a single name for a character
        var characterData = response.cast[i].character.split("/");
        
        characterP.text(response.cast[i].name)
          .attr("class", "pt-1");

        characterBtn.text(response.cast[i].character)
        // data-character holds a single name for searching the comic book data
          .attr("class", "mr-3 p-1 btn btn-danger btnHover")
          .attr("id", "character-btn");

      // check for character multiple character names, if there is more use the second name in the array
        if(characterData[1]){
          characterBtn.attr("data-character", characterData[1].trim() )
        } else {
          characterBtn.attr("data-character", characterData[0] )
        }

        characterDiv.append(characterBtn, characterP, );
        $("#movie-info").append(characterDiv);
      }
    } 
    // for all other movies print the first 20 characters
    else {
      for (var i = 0; i < 20; i++) {
        var characterDiv = $("<div>")
          .attr("class", "row mb-2");
        var characterP = $("<span>");
        var characterBtn = $("<button>");
        var characterData = response.cast[i].character.split("/");
        characterP.text(response.cast[i].name)
        .attr("class", "pt-1");
        characterBtn.text(response.cast[i].character)
          .attr("data-character", characterData[0].trim())
          .attr("class", "mr-3 btn p-1 btn-danger btnHover")
          .attr("id", "character-btn");
        characterDiv.append(characterBtn, characterP);
        $("#movie-info").append(characterDiv);
      }
    };
  })

})

// run make buttons on load
makeBtns();

// Event listener for when user clicks character buttons
$(document).on("click", "#character-btn", function () {
  // clears data currently in "Comic Book Info" card
  $("#character-name").empty();
  $("#image").empty();
  $("#bio").empty();
  $("#pictures").empty();

  // pull the character name from the button
  var characterName = "Ant-Man"
  // temp commenting out button info pull while figuring out reliable search term
  // $(this).attr("data-character");
  console.log(characterName);
  var charNameNoSpace = characterName
  // temp commenting out space replace
  // .replace(" ", "%20");
  console.log(charNameNoSpace);
  // data fields the API will return
  var fieldList = "&field_list=aliases,count_of_issue_appearances,deck,first_appeared_in_issue,id,image,name,origin,real_name";
  
  // Build the URL for the Comic Vine Query
  var comicVineURL = "https://alex-rosencors.herokuapp.com?url=https://comicvine.gamespot.com/api/characters/?api_key=fb977c36a2f57bed0f744c1a48a73a2360ea71c6&format=json&filter=name:"+ charNameNoSpace + "&limit=10" + fieldList;

  // Ajax'ing the Comic Vine API
  $.ajax({
    url: comicVineURL,
    method: "GET"
    })
  .then(function(comicVineResponse) {
    console.log(comicVineURL);
    console.log(comicVineResponse);
    
    // assign response data to variables 
    // and console log variables for testing
    var name = comicVineResponse.results[0].name;
    console.log(name);
    var aliases = comicVineResponse.results[0].aliases;
    var aliasesEdited = aliases.split(/\r?\n|\r/);
    console.log(aliases);
    console.log(aliasesEdited[0]);
    var deck = comicVineResponse.results[0].deck;
    console.log(deck);
    var characterImage = comicVineResponse.results[0].image.medium_url;
    console.log(characterImage);
    var imageReplace = $("<img>")
    .attr("class", "image-2 border border-dark")
    .attr("src", characterImage)
    .attr("alt", "character image")
    .attr("id", "char-image");


    // Print data to comic info panel
    $("#character-name").text(name);
    $("#bio").text(deck);
    $("#image").append(imageReplace);
  });
})
