import { triggerFireworks } from "./fireworks.js";

const base_url =
    "https://fe24-vs-grupp1-slutprojekt-default-rtdb.europe-west1.firebasedatabase.app/.json";
// comments
// ännu mer comments lol
const sortfilter = document.getElementById("sort");
sortfilter.addEventListener("change", async () => {
    console.log("test");
    document.getElementById("messageDisplay").innerHTML = "";
    fetchMessages();
});

class MessageInfo {
    constructor(name, message) {
        this.name = name;
        this.message = message;
        this.timestamp = new Date().toLocaleString(); // Ger ett läsbart datum och tid
    }
}

async function shakeMessages() {
    const allMessages = document.querySelectorAll(".message-item");
    allMessages.forEach((msg) => {
        const delay = Math.random() * 500;
        setTimeout(() => {
            msg.classList.add("shake");
            setTimeout(() => {
                msg.classList.remove("shake");
            }, 1000);
        }, delay);
    });
}

// generating color

function createRandomColor() {
    const getRandomValue = () => Math.floor(Math.random() * 156) + 100;

    let red = getRandomValue();
    let green = getRandomValue();
    let blue = getRandomValue();

    const MIN_DIFF = 50;
    if (Math.abs(red - green) < MIN_DIFF) green = (green + 100) % 256;
    if (Math.abs(green - blue) < MIN_DIFF) blue = (blue + 100) % 256;
    if (Math.abs(blue - red) < MIN_DIFF) red = (red + 100) % 256;

    const rgbColor = `rgb(${red}, ${green}, ${blue})`;

    return rgbColor;
}

export async function addMessage(event) {
    event.preventDefault();

    const nameInput = document.querySelector("#name");
    const messageInput = document.querySelector("#messageBoard");

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const birthdayDiv = document.querySelector(".birthdayDiv");
    birthdayDiv.style.display = "none";
    if (!name || !message) {
        alert("Provide both name and message");
        return;
    }
    const msgProf = await profanityCheckAndPost(message);
    if (msgProf.isProfanity) {
        alert("Please refrain from using profanity.");
        return;
    }
    if (message.includes("my birthday")) {
        birthdayDiv.style.display = "block";
        setTimeout(() => {
            birthdayDiv.style.display = "none";
        }, 2000);
    } else {
        birthdayDiv.style.display = "none";
    }

    const newMessage = new MessageInfo(name, message);

    const options = {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    };

    try {
        const res = await fetch(base_url, options);
        if (!res.ok)
            throw new Error(
                "Something went wrong when adding a message. Try again!"
            );

        const data = await res.json();
        console.log("Message added:", data);

        // Add the message to the DOM with a "Remove" button
        const messageDisplay = document.querySelector("#messageDisplay");
        if (messageDisplay) {
            const messageItem = document.createElement("div");
            messageItem.classList.add("message-item");

            // Add message content
            const messageContent = document.createElement("p");
            messageContent.textContent = `${name}: ${message}`;

            // Add "Remove" button
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-button");
            // Add "Remove" button functionality with Firebase deletion
            removeButton.addEventListener("click", async () => {
                console.log("Remove button clicked for:", message);

                try {
                    // Find the key of the message to delete
                    const messageKey = Object.keys(data).find(
                        (key) =>
                            data[key].message === message &&
                            data[key].name === name
                    );

                    if (!messageKey) {
                        console.error("Message key not found for:", message);
                        return;
                    }

                    // Make a DELETE request to Firebase
                    const deleteUrl = `https://fe24-vs-grupp1-slutprojekt-default-rtdb.europe-west1.firebasedatabase.app/${messageKey}.json`;
                    const deleteResponse = await fetch(deleteUrl, {
                        method: "DELETE",
                    });

                    if (!deleteResponse.ok) {
                        throw new Error(
                            "Failed to delete message from Firebase"
                        );
                    }

                    console.log("Message deleted from Firebase:", messageKey);

                    // Remove the message div from the DOM
                    messageItem.remove();
                } catch (error) {
                    console.error("Error deleting message:", error);
                }
            });

            // Append content and button to the message item
            messageItem.append(removeButton, messageContent);

            // Append the message item to the display container
            messageDisplay.appendChild(messageItem);
        } else {
            console.error("Error: #messageDisplay not found");
        }

        nameInput.value = "";
        messageInput.value = "";
        const formContainer = document.querySelector(".messageContainer");
        triggerFireworks(formContainer); // Anropa funktionen för att utlösa fyrverkerier

        showSuccessNotification(); // Visar en notifiering om att meddelandet skickades
    } catch (error) {
        console.error("Error:", error);
        alert("Could not add a message, try again!");
    }
}

export async function fetchMessages() {
    try {
        const res = await fetch(base_url);
        if (!res.ok) throw new Error("Could not fetch messages");

        const data = await res.json();
        const sortOption = sortfilter.value;
        console.log(sortOption);

        let messageArray = data ? Object.entries(data) : [];
        switch (sortOption) {
            case "alpha-asend":
                messageArray.sort(([, a], [, b]) => {
                    if (a.name < b.name) return -1;
                    else if (a.name > b.name) return 1;
                    return 0;
                });
                break;

            case "alpha-desend":
                messageArray.sort(([, a], [, b]) => {
                    if (a.name < b.name) return -1;
                    else if (a.name > b.name) return 1;
                    return 0;
                });
                break;
            case "message-length":
                messageArray.sort(([, a], [, b]) => {
                    if (a.message.length < b.message.length) return -1;
                    else if (a.message.length > b.message.length) return 1;
                    return 0;
                });
                break;
            default:
                break;
        }

        console.log(messageArray);

        if (messageArray.length === 0) {
            displayNoMessagesMessage(); // Visa meddelande om inga meddelanden finns
        } else {
            displayMessages(Object.fromEntries(messageArray)); // Pass the sorted data as an object
            displayMessageOfTheDay(Object.values(data)); // Visa dagens meddelande
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// Ny funktion för att visa ett meddelande när inga meddelanden finns
function displayNoMessagesMessage() {
    const messageDisplay = document.querySelector("#messageDisplay");

    if (!messageDisplay) {
        console.error("Error: #messageDisplay not found");
        return;
    }

    messageDisplay.innerHTML = "<p>Inga meddelanden än.</p>";
}

export function displayMessages(messages) {
    const messageDisplay = document.querySelector("#messageDisplay");

    if (!messageDisplay) {
        console.error("Error: #messageDisplay not found");
        return;
    }

    messageDisplay.innerHTML = "";

    Object.entries(messages).forEach(([messageKey, message]) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message-item");
        const backgroundColor = createRandomColor();
        messageElement.style.backgroundColor = backgroundColor;

        // Add message content
        const messageContent = document.createElement("p");
        messageContent.innerHTML = `
            <strong>${message.name}</strong> (${message.timestamp}) <br>
            ${message.message}
        `;

        // Add "Remove" button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", async () => {
            console.log("Remove button clicked for:", message.message);

            try {
                // Make a DELETE request to Firebase
                const deleteUrl = `https://fe24-vs-grupp1-slutprojekt-default-rtdb.europe-west1.firebasedatabase.app/${messageKey}.json`;
                const deleteResponse = await fetch(deleteUrl, {
                    method: "DELETE",
                });

                if (!deleteResponse.ok) {
                    throw new Error("Failed to delete message from Firebase");
                }

                console.log("Message deleted from Firebase:", messageKey);

                // Remove the message div from the DOM
                messageElement.remove();
            } catch (error) {
                console.error("Error deleting message:", error);
            }
        });

        // Append content and button to the message element
        messageElement.appendChild(messageContent);
        messageElement.appendChild(removeButton);

        // Prepend the message element to the display container
        messageDisplay.prepend(messageElement);
    });

    shakeMessages();
}

// Ny funktion för att visa en notifiering om att meddelandet skickades
function showSuccessNotification() {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = "Meddelandet har skickats!";

    document.body.appendChild(notification);

    // Ta bort notifieringen efter 3 sekunder
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchMessages();

    const submitBtn = document.querySelector("#submitButton");
    if (submitBtn) {
        submitBtn.addEventListener("click", addMessage);
    } else {
        console.error("Error");
    }
});

export function displayMessageOfTheDay(messages) {
    const motdContainer = document.querySelector("#motdDisplay");

    if (!motdContainer) {
        console.error("MOTD container not found.");
        return;
    }

    if (messages.length === 0) {
        motdContainer.textContent = "No messages yet.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * messages.length);
    const motd = messages[randomIndex];

    motdContainer.innerHTML = `
        <strong>${motd.name}</strong> (${motd.timestamp}) <br>
        "${motd.message}"
    `;
}

export async function profanityCheckAndPost(message) {
    try {
        const res = await fetch('https://vector.profanity.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data)
       if(data.isProfanity == true){
        return {isProfanity: true};
       }
       else{
        return {isProfanity: false};
       }
       
    } catch (error) {
        console.error("Error checking profanity:", error);
        return false; 
    }
}
