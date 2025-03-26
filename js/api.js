const base_url = "https://fe24-vs-grupp1-slutprojekt-default-rtdb.europe-west1.firebasedatabase.app/";
// comments
// ännu mer comments lol
    
class MessageInfo {
    constructor(name, message) {
        this.name = name;
        this.message = message;
        this.timestamp = new Date().toLocaleString(); // Ger ett läsbart datum och tid
    }
}

    export async function addMessage(event) {
        event.preventDefault();
        
        const name = document.querySelector('#name').value.trim;
        const message = document.querySelector('#messageBoard').value.trim();

        if (!name || !message) {
            alert('Provide both name and message');
            return;
        }
        
        const newMessage = new MessageInfo(name, message)

        const options = {
            method: "POST", 
            body: JSON.stringify(newMessage),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        };

        try {
            const res = await fetch(base_url, options);
            if (!res.ok) throw new Error("Something went wrong when adding a message. Try again!");
    
            const data = await res.json();
            console.log("Message added:", data);
    
            document.querySelector('#name').value = "";
            document.querySelector('#messageBoard').value = "";
    
        } catch (error) {
            console.error("Error:", error);
            alert("Could not add a message, try again!");
        }
    }
