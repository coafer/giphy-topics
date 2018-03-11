// Initial array of topics
var topics = ["fish","dog","tiger","wolf","pangolin","koala","rhino","fox","mantis"];

// display animalInfo function re-renders the HTML to display the appropriate content
function displayanimalInfo(){
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=TxasiTtyjmI00B0foqv5g8CPJcoETEvn&limit=10";

    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
         url: queryURL,
         method: 'GET'
        }).then(function(response){
        console.log(response);

        // Creating a div to hold the pictures
        var animalDiv = $("#topics-view").empty();

        //Print the images on the DOM
        for (i = 0; i < 10; i++){

            //store the animated url    
            var imgAnimated = response.data[i].images.fixed_height.url;

            //store the still url    
            var imgStill = response.data[i].images.fixed_height_still.url;

            //Place the gifs inside #animalDiv
            animalDiv.append("<img src='" + imgAnimated + "'data-still='" + imgStill + "' data-animated='" + imgAnimated + "' >");
        }   
    });

}

  // Function for displaying animal data
function renderButtons() {

    // Deleting the topics prior to adding new topics
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        var a = $("<button>");

        // Adding a class of animal-btn to our button
        a.addClass("animal-button");

        // Adding a data-attribute
        a.attr("data-name", topics[i]);

        // Providing the initial button text
        a.text(topics[i]);

        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

  // This function handles events where a animal button is clicked
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();
    
    // Alert if there is nothing to input
    if (animal === ""){
        alert("plase enter an animal");
        return;
    }
    
    // Adding animal from the textbox to our array
    topics.push(animal);
    $("#animal-input").val("");  

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-button", displayanimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

//Function for toggle images on click
$("#topics-view").delegate("img", "click", function(){
    var img = $(this);
    var anime = $(this).data("animated");
    var still = $(this).data("still");
    var currentState = $(this).attr("src");

    currentState === anime ? img.attr("src", still) : img.attr("src", anime);
});
