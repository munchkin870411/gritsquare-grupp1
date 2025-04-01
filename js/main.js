document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;

    // Function to update button text based on the current mode
    const updateButtonText = () => {
        if (body.classList.contains("dark-mode")) {
            toggleButton.textContent = "Switch to Light Mode";
        } else {
            toggleButton.textContent = "Switch to Dark Mode";
        }
    };

    // Check for saved preference in localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // Update button text on page load
    updateButtonText();

    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Save preference to localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }

        // Update button text after toggling
        updateButtonText();
    });
});
