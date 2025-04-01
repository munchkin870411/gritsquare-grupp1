document.addEventListener('DOMContentLoaded', () => {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'messageSearch';
    searchInput.placeholder = 'Search by username or message content...';
    
    // Create search icon
    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon';
    
    // Append search elements to container
    searchContainer.appendChild(searchIcon);
    searchContainer.appendChild(searchInput);
    
    // Insert search container after the form container
    const formContainer = document.querySelector('.formContainer');
    formContainer.parentNode.insertBefore(searchContainer, formContainer.nextSibling);
    
    // Add event listener for search input
    searchInput.addEventListener('input', filterMessages);
    
    // Function to filter messages
    function filterMessages() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const allMessages = document.querySelectorAll('.message-item');
        
        // If search term is empty, show all messages
        if (!searchTerm) {
            allMessages.forEach(message => {
                message.style.display = 'block';
            });
            return;
        }
        
        // Filter messages
        allMessages.forEach(message => {
            const messageText = message.textContent.toLowerCase();
            if (messageText.includes(searchTerm)) {
                message.style.display = 'block';
            } else {
                message.style.display = 'none';
            }
        });
        
        // Add indicator of how many messages are visible
        const visibleCount = Array.from(allMessages).filter(
            msg => msg.style.display !== 'none'
        ).length;
        
        // Update or create search results count element
        let searchResultCount = document.getElementById('searchResultCount');
        if (!searchResultCount) {
            searchResultCount = document.createElement('div');
            searchResultCount.id = 'searchResultCount';
            searchContainer.appendChild(searchResultCount);
        }
        
        searchResultCount.textContent = `Found ${visibleCount} message${visibleCount !== 1 ? 's' : ''}`;
    }
    
    // Check if dark mode is active and apply styles accordingly
    function updateSearchTheme() {
        if (document.body.classList.contains('dark-mode')) {
            searchContainer.classList.add('dark-mode');
        } else {
            searchContainer.classList.remove('dark-mode');
        }
    }
    
    // Initial theme check
    updateSearchTheme();
    
    // Listen for dark mode changes
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            // Small delay to ensure the body class has been updated
            setTimeout(updateSearchTheme, 10);
        });
    }
});