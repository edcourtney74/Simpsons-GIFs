// VARIABLES ====================================================================
// Variable that holds an array of characters
var characters = ["Homer", "Marge", "Bart", "Lisa", "Maggie", "Moe", "Barney", "Nelson", "Mr. Burns",
    "Ned", "Millhouse", "Apu", "Grampa", "Willie"];

// Variable that holds only letters/numbers of character (no spaces, special characters)
var textNameOnly;

// Variable for button that will be created across the page
var newButton;

// Variable for search term
var searchName;

// Variable that will hold the URL needed for the specific character search
var queryURL;


// FUNCTIONS ====================================================================
$(document).ready(function () {

    function createButton() {

        // Erase current buttons from HTML so duplicates aren't added
        $("#character-list").empty();

        // Create buttons for characters
        // For loop over characters array
        for (i = 0; i < characters.length; i++) {

            // Create character name that replaces spaces or special characters with &
            // This will help the AJAX request

            textNameOnly = characters[i].replace(/[^A-Z0-9]/ig, "&");

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
        console.log("Query URL: " + queryURL);

        // Send AJAX request according to button pressed
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
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

                // Add width of 100% to image
                image.attr("width", "100%")

                // Add class to img element to apply Bootstrap styling to images
                // Add class for animate click function
                image.addClass("image-fluid gif");

                // Set display variable based on x value
                var gifPlacement = $("#gif" + x);
                console.log(gifPlacement)
                
                // Display image in HTML
                gifPlacement.append(image);

                // Store rating data in a variable
                var rating = res.data[x].rating;

                // Create element to store rating data
                var ratingData = $("<p>").text("Rating: " + rating);

                // Add rating data to display in HTML
                gifPlacement.append(ratingData);
            }
        })
    };

    // CLICK FUNCTIONS==============================================================

    // Click function to display GIFs
    $(document).on("click", ".gif-selection", function () {
        // Removes previous GIFs displayed
        $(".gif-remove").empty();

        // Retrieves value of "data-name" to use in queryURL
        searchName = $(this).attr("data-name");

        // Run sendRequest function to get API
        sendRequest();
    });

    // Click function to animate GIFs
    $(document).on("click", ".gif", function () {
        // Get "state" attribute from GIF and store in variable
        var state = $(this).attr("data-state");

        // Check data-state of GIF
        if (state === "still") {
            // If state is currently still:
            // Change img url to data-animate url
            $(this).attr("src", $(this).attr("data-animate"));
            // Change data state to animate
            $(this).attr("data-state", "animate");
        } else {
            // If state is currently animate:
            // Change img url to data-still url
            $(this).attr("src", $(this).attr("data-still"));
            // Change data state to still
            $(this).attr("data-state", "still");
        }
        
    });
    
    // Submit click function to create new button, display GIFs of request
    $(document).on("click", ".create-character", function () {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        
        // Create variable containing user submission
        var userChoice = $("#character-input").val().trim();
        console.log(userChoice);

        // Push user submission to characters array
        characters.push(userChoice);
        console.log(characters);
        
        // Call createButton to add buttons to the screen, including the new one 
        createButton();

        // Sets searchName to user submission in order to run sendRequest
        // Removes non-alphanumeric characters, replaces with &
        // searchName = userChoice.replace(/[^A-Z0-9]/ig, "&")

        // Call sendRequest to get API, display GIFs for new entry
        // sendRequest();

    })

    // PAGE STARTUP=============================================================  
    createButton();

});







// GIF begins or stops animation on GIF button click

// Display rating of each GIF


















