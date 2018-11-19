// VARIABLES ====================================================================
// Variable that holds an array of characters
var characters = ["Homer", "Marge", "Bart", "Lisa", "Maggie", "Moe", "Barney", "Nelson", "Mr. Burns", 
"Ned", "Millhouse", "Apu", "Grampa", "Willie", "xxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx"];

// Variable that holds only letters/numbers of character (no spaces, special characters)
var textNameOnly;

// Variable for button that will be created across the page
var newButton;

// Variable for search term
var searchName;

// Variable that will hold the URL needed for the specific character search
var queryURL;




// FUNCTIONS ====================================================================
function createButton() {

    // Erase current buttons from HTML so duplicates aren't added
    $("#button-list").empty();

    // Create buttons for characters
    // For loop over characters array
    for (i = 0; i < characters.length; i++) {              
    
        // Create character name with no special characters - will help our URL query
        textNameOnly = characters[i].replace(/[^A-Z0-9]/ig, "");       
        
        // Creates physical button that displays name of character in array
        // Creates button tag
        newButton = $("<button>");
        // Adds classes from Bootstrap, class .gif-selection for on click functioning;
        // attribute of character name (no spaces), text to button
        newButton.addClass("btn btn-primary btn-sm mx-1 mt-2 gif-selection").attr("data-name", textNameOnly).text(characters[i]);
        // Add button to HTML
        $("#character-list").append(newButton);   
    }
}

// Function to send API request
function sendRequest() {    

    //Set queryURL variable needed for API request
    // Also sets limit of 10 and rating of up to PG-13 
    queryURL = "https://api.giphy.com/v1/gifs/search?q=simpsons+" + searchName + "&api_key=CEnxMFTt8LQl5mNY8uF0N6NKduTtPcgK&limit=10&rating=pg-13"; 
   
    // Send AJAX request according to button pressed
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(res) {
        console.log(res);
        // Create for loop to go through all 10 items in response array
        for (let x = 0; x < res.data.length; x++) {
            
            // Create div for each GIF
            var divGIF = $("<div>");

            // Create img element to hold GIF
            var image = $("<img>");

            // Create the still GIF URL for img element
            var stillGIF = res.data[x].images.fixed_width_still.url;
            
            // Create the animated GIF URL for img element
            var animatedGIF = res.data[x].images.fixed_width.url;

            // Set img url to stillGIF when placed on page
            image.attr("src", stillGIF);

            // Add stillGIF, animatedGIF to img element
            image.attr("data-still", stillGIF).attr("data-animate", animatedGIF);

            // Add data-state element to img element, set to still
            image.attr("data-state", "still");

            // Add class to img element to apply Bootstrap styling to images
            image.addClass("m-2");

            // Display image in HTML
            $("#GIF-display").append(image);

            // Store rating data in a variable
            var rating = res.data[x].rating;

            // Create element to store rating data
            var ratingData = $("<p>").text("Rating: " + rating);

            // Add rating data to display in HTML
            $("#GIF-display").append(ratingData);
            




            
        }

    })
};



// Click function for buttons created
$(document).on("click", ".gif-selection", function() {
    // Retrieves value of "data-name" to use in queryURL
    searchName = $(this).attr("data-name");
    console.log("Search name: " + searchName);
    
    // Run sendRequest function to get API
    sendRequest();

});
    



       



// GIF begins or stops animation on GIF button click

// Display rating of each GIF


















// MAIN PROCESS================================================================================
$(document).ready(function () {
    createButton();
     
});