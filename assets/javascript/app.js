// VARIABLES ====================================================================
// Variable that holds an array of characters
var characters = ["Homer", "Marge", "Bart", "Lisa", "Maggie", "Moe", "Barney", "Nelson", "Mr. Burns", 
"Ned", "Millhouse", "Apu", "Grampa", "Willie", "xxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx", "xxxxxxxxxx"];

// Variable for button that will be created across the page
var newButton;

// Variable that will hold the URL needed for the specific character search
var queryURL;


// FUNCTIONS ====================================================================
function createButton() {

    // Erase current buttons so duplicates aren't added
    $("#button-list").empty();

    // Create buttons for characters
    // For loop over characters array
    for (i = 0; i < characters.length; i++) {              
        
        // Creates physical button that displays name of character in array
        // Creates button tag
        newButton = $("<button>");
        // Adds classes from Bootstrap, attributes to add character name, text to button
        newButton.addClass("btn btn-primary btn-sm mx-1 mt-1").attr("data-name", characters[i]).text(characters[i]);
        // Add button to HTML
        $("#character-list").append(newButton);  
       
        // Store value in button to add to queryURL for AJAX request
        


        // Remove any non-letters so that the URL 

        // Create HTML button for each character in array on page load
        queryURL = "https://api.giphy.com/v1/gifs/search?q=simpsons+" + characters[i] + "&api_key=CEnxMFTt8LQl5mNY8uF0N6NKduTtPcgK&limit=10&rating=g+pg"; 
        
        console.log(queryURL);
    }
}

// Display rating of each GIF



// CLICK FUNCTIONS =============================================================
// When user clicks a button (grab 10 static, non-animated GIFs from GIPHY):
    // Returns 10 GIFs from GIPHY - non-animated
    // Display GIFs on page

// GIF begins or stops animation on GIF button click

















// MAIN PROCESS================================================================================
$(document).ready(function () {
    createButton();
});