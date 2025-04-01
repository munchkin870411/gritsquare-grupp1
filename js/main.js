document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check for saved preference in localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Save preference to localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});
