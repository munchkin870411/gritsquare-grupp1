document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;
    const messageForm = document.getElementById("messageForm");
    if (!messageForm) {
        console.error("Error: Element with ID 'messageForm' not found in the DOM.");
        return;
    }
    const messageDisplay = document.getElementById("messageDisplay");

    // Function to update button text based on the current mode
    const updateButtonText = () => {
        if (body.classList.contains("dark-mode")) {
            toggleButton.textContent = "Switch to Light Mode";
        } else {
            toggleButton.textContent = "Switch to Dark Mode";
        }
    };

    // Function to update button icon based on the current mode
    const updateButtonIcon = () => {
        if (body.classList.contains("dark-mode")) {
            toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Light mode icon
        } else {
            toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Dark mode icon
        }
    };

    // Check for saved preference in localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // Update button text and icon on page load
    updateButtonText();
    updateButtonIcon();

    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Save preference to localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }

        // Update button text and icon after toggling
        updateButtonText();
        updateButtonIcon();
    });

    // Function to add a new message with a "Remove" button
    function addMessage(username, messageText) {
        console.log("reached function");
        const messageItem = document.createElement("div");
        messageItem.classList.add("message-item");

        // Add message content
        const messageContent = document.createElement("p");
        messageContent.textContent = `${username}: ${messageText}`;
        //messageItem.appendChild(messageContent);

        // Add "Remove" button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => {
            console.log("Remove button clicked for:", messageText);
            messageItem.remove(); // Remove the message div
        });
        messageItem.append(removeButton, messageContent);

        // Append the message to the display container
        messageDisplay.appendChild(messageItem);
    }
    console.log(messageForm);

    // Handle form submission to add a new message
    messageForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        console.log("entered eventlistener");

        const username = document.getElementById("name").value;
        const messageText = document.getElementById("messageBoard").value;

        if (username && messageText) {
            addMessage(username, messageText); // Add the new message
            messageForm.reset(); // Clear the form
        }
    });
});

/// Character Counter Messages
const messageInput = document.getElementById("messageBoard");
const charCounter = document.getElementById("char-counter");

messageInput.addEventListener("input", () => {
  const currentLength = messageInput.value.length;
  charCounter.textContent = `${currentLength}/200 characters`;
});