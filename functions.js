document.addEventListener("DOMContentLoaded", function() {
    var loginContainer = document.getElementById("login-container");
    var signInButton = document.getElementById("signin-button");
    var signUpButton = document.getElementById("signup-button");
    var initialScreen = document.getElementById("initial-screen");
    var playGameButton = document.getElementById("play-game-btn");
    var gameContainer = document.getElementById("game-container");
    var scoreboardButton = document.getElementById("scoreboard-button");
    var usagePreferencesForm = document.getElementById("usage-preferences");

    // Function to show the usage preferences form
    function showUsagePreferences() {
        usagePreferencesForm.style.display = "block";
    }

    // Event listener for "Sign In" button
    signInButton.addEventListener("click", function() {
        // Check if a database is connected
        if (!databaseData) {
            alert("Please connect a database in order to sign in.");
        } else {
            // Proceed to the sign-in form
            loginContainer.style.display = "none"; // Hide the login container
            signInForm.style.display = "block"; // Show the sign-in form
        }
    });

    // Event listener for "Sign Up" button
    signUpButton.addEventListener("click", function() {
        // Check if a database is connected
        if (!databaseData) {
            alert("Please connect a database in order to sign up.");
        } else {
            // Proceed to the sign-up form
            loginContainer.style.display = "none"; // Hide the login container
            signUpForm.style.display = "block"; // Show the sign-up form
        }
    });

    // Event listener for "Play Game" button
    playGameButton.addEventListener("click", function() {
        // Hide the usage preferences form
        usagePreferencesForm.style.display = "none";
        
        // Show the game container
        gameContainer.style.display = "block";

        // Call the function to start the game
        startGame();
    });

    // Event listener for "Show New Form" button
    var showNewFormButton = document.getElementById("show-new-form-btn");
    var newFormContainer = document.getElementById("new-form-container");

    showNewFormButton.addEventListener("click", function() {
        console.log("Button clicked"); // Check if the event listener is triggered
        newFormContainer.style.display = "block"; // Show the new form
    });

    var scoreboardButton = document.getElementById("scoreboard-button");
    var scoreboardContainer = document.getElementById("scoreboard-container");
    var closeScoreboardButton = document.getElementById("close-scoreboard-button");

    var databaseData; // Variable to store the JSON database data

    // Event listener for Scoreboard button
    scoreboardButton.addEventListener("click", function() {
        // Show scoreboard if database is loaded
        if (databaseData) {
            scoreboardContainer.style.display = "block";
            // Call function to populate scoreboard with data
            populateScoreboard();
        } else {
            alert("Database not connected. Please upload a valid JSON file.");
        }
    });

    // Event listener for Close Scoreboard button
    closeScoreboardButton.addEventListener("click", function() {
        // Hide scoreboard
        scoreboardContainer.style.display = "none";
    });

    // Function to populate the scoreboard with data
    function populateScoreboard() {
        // Sort the databaseData array based on scores in descending order
        databaseData.sort(function(a, b) {
            return b.score - a.score;
        });

        // Take only top 10 scores
        var top10Scores = databaseData.slice(0, 10);

        var scoreboardBody = document.getElementById("scoreboard-body");
        scoreboardBody.innerHTML = ""; // Clear previous data

        top10Scores.forEach(function(entry) {
            var row = document.createElement("tr");
            row.innerHTML = "<td>" + entry.username + "</td><td>" + entry.score + "</td>";
            scoreboardBody.appendChild(row);
        });
    }

    var loginContainer = document.getElementById("login-container");
    var gameContainer = document.getElementById("game-container");
    var signInButton = document.getElementById("signin-button");
    var signUpButton = document.getElementById("signup-button");
    var connectDatabaseButton = document.getElementById("connect-database-button");
    var signUpForm = document.getElementById("signup-form");
    var signInForm = document.getElementById("signin-form");
    var finishButton = document.getElementById("finish-button");
    var fileInput = document.getElementById("file-upload");

    var databaseData; // Variable to store the JSON database data
    var score = 0; // Initialize score

    // Hide game container initially
    gameContainer.style.display = "none";


    // Event listener for Connect Database button
    connectDatabaseButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default behavior of the button click
        fileInput.click(); // Trigger click event on file input
    });

    // Event listener for file upload
    fileInput.addEventListener("change", function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            var jsonData = JSON.parse(event.target.result);
            // Validate the JSON data format (check if it contains the required fields)
            if (isValidDatabase(jsonData)) {
                databaseData = jsonData; // Store the JSON data in the variable
                console.log("Database connected:", jsonData);
            } else {
                alert("Invalid database format. Please upload a valid JSON file.");
            }
        };

        reader.readAsText(file);
    });

    // Event listener for successful sign in
    signInForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        var username = signInForm.querySelector('input[type="text"]').value;
        var password = signInForm.querySelector('input[type="password"]').value;

        // Check if the entered username exists in the database data
        var user = databaseData.find(function(user) {
            return user.username === username && user.password === password;
        });

        if (user) {
            // Here you would typically handle the sign-in process for authenticated users
            console.log("Signed in as:", username);

            // Hide sign-in form
            signInForm.style.display = "none";

            // Call function to show the usage preferences form
            showUsagePreferences();

        } else {
            alert("Invalid username or password. Please try again.");
        }
    });

    // Event listener for successful sign up
    signUpForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        var username = document.getElementById("signup-username").value;
        var password = document.getElementById("signup-password").value;
        var confirmPassword = document.getElementById("signup-confirm-password").value;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Check if the password meets the requirements
        if (!isValidPassword(password)) {
            alert("Password must be at least 12 characters long and contain at least 2 special characters.");
            return;
        }

        // Check if the username already exists in the database
        var existingUser = databaseData.find(function(user) {
            return user.username === username;
        });

        if (existingUser) {
            alert("Username already exists. Please choose a different username.");
            return;
        }

        // Add the new user to the database data with initial score of 0
        var newUser = {
            username: username,
            password: password,
            score: 0
        };
        databaseData.push(newUser);

        // Update the JSON file with the new data
        updateDatabaseFile(databaseData);

        // Here you would typically handle the sign-up process and check if it's successful
        // For demonstration purposes, let's assume the sign-up is successful
        console.log("Registered and signed in as:", username);

        // Hide sign-up form
        signUpForm.style.display = "none";

        // Call function to show the usage preferences form
        showUsagePreferences();
    });

    // Event listener for Finish button
    finishButton.addEventListener("click", function() {
        // Get the username of the current user
        var username = signInForm.querySelector('input[type="text"]').value;

        // Find the user in the database data
        var user = databaseData.find(function(user) {
            return user.username === username;
        });

        if (user) {
            // Update the user's score in the database data
            user.score = score; // Update the score with the current game score

            // Update the JSON file with the new score
            updateDatabaseFile(databaseData);

            alert("Score saved successfully!");
        } else {
            alert("User not found in the database.");
        }
    });

    // Function to update the JSON file with new data
    function updateDatabaseFile(data) {
        // Convert the data to JSON string
        var jsonData = JSON.stringify(data);

        // Save the JSON string to a new Blob object
        var blob = new Blob([jsonData], { type: "application/json" });

        // Create a temporary anchor element
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Download the updated JSON file
        link.download = "database.json";
        link.click();
    }

    // Function to validate the password
    function isValidPassword(password) {
        // Password must be at least 12 characters long and contain at least 2 special characters
        var specialChars = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        return password.length >= 12 && password.match(specialChars) && password.match(specialChars).length >= 2;
    }

    // Function to validate the JSON data format
    function isValidDatabase(jsonData) {
        // Validate if the jsonData contains the required fields for user credentials
        return Array.isArray(jsonData) && jsonData.every(function(user) {
            return 'username' in user && 'password' in user;
        });
    }

    // Function to start the game
    function startGame() {
        // Your game initialization code goes here
        // For now, I'll just print a message to the console
        console.log("Game started!");
    }
});
