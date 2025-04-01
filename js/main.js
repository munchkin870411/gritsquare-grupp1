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
});
