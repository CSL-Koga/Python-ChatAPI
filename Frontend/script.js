const messageList = document.getElementById('message-list');

function loadUsername() {
    const usernameDisplay = document.getElementById('username-display');
    const username = sessionStorage.getItem('username');

    if (username) {
        usernameDisplay.innerText = username;
    } else {
        usernameDisplay.innerText = 'Guest';
    }
}

function loadMessages() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.messages) {
                        displayMessages(response.messages);
                        scrollToBottom();
                    } else {
                        console.error('Fehler: messages nicht gefunden.');
                    }
                } catch (error) {
                    console.error('Fehler beim Parsen der JSON-Daten:', error);
                }
            } else {
                console.error('Fehler beim Abrufen der Nachrichten. Status:', xhr.status);
            }
        }
    };

    xhr.open('GET', 'http://127.0.0.1:80/get_messages', true);
    xhr.send();
}

function displayMessages(messages) {
    messageList.innerHTML = ''; // Leert die Nachrichtenliste

    const loggedInUser = sessionStorage.getItem('username');

    messages.forEach(message => {
        // Überprüfung, ob die Nachricht leer ist
        if (message.message.trim() !== '') {
            const li = document.createElement('li');
            const container = document.createElement('div');

            const messageText = document.createElement('p');
            messageText.classList.add('message-text');
            messageText.textContent = message.message;

            const messageTime = document.createElement('p');
            messageTime.classList.add('message-info');
            const time = new Date(message.timestamp);
            const formattedDate = `${time.getFullYear()}-${('0' + (time.getMonth() + 1)).slice(-2)}-${('0' + time.getDate()).slice(-2)}`;
            const formattedTime = `${('0' + time.getHours()).slice(-2)}:${('0' + time.getMinutes()).slice(-2)}`;
            messageTime.textContent = `${message.from_user} (${formattedDate} ${formattedTime})`;

            container.appendChild(messageText);
            container.appendChild(messageTime);
            li.appendChild(container);
            messageList.appendChild(li);

            // Überprüfung, ob die Nachricht vom eingeloggten Benutzer stammt
            if (message.from_user === loggedInUser) {
                container.classList.add('message-container', 'own-message');
                messageText.classList.add('own-message-text');
                messageTime.classList.add('own-message-info');
            } else {
                container.classList.add('message-container');
            }
        }
    });
}


const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
};

function sendMessageToServer() {
    const messageInput = document.getElementById('message-input');
    const messageContent = messageInput.value.trim();

    showNotification();

    if (messageContent !== '') {
        const username = sessionStorage.getItem('username');
        const xhr = new XMLHttpRequest();
        const url = `http://127.0.0.1:80/msg?msg=${encodeURIComponent(messageContent)}&user=${encodeURIComponent(username)}`;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = xhr.responseText;
                    if (response === "1") {
                        // Nachricht wurde erfolgreich gesendet
                        console.log('Nachricht wurde erfolgreich gesendet.');
                        messageInput.value = ''; // Nachrichtenfeld leeren
                        loadMessages(); // Aktualisiere die Nachrichtenliste
                        scrollToBottom(); // Scrolle nach unten
                    } else {
                        console.error('Fehler beim Senden der Nachricht.');
                    }
                } else {
                    console.error('Fehler: ' + xhr.status);
                }
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    }
}


// Event-Handler für den "Senden"-Button
const sendButton = document.getElementById('send-button');
if (sendButton) {
    sendButton.addEventListener('click', function(event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite bei einem Klick auf den Button
        sendMessageToServer(); // Aufruf der Funktion zum Senden der Nachricht
    });
}

// Event-Handler für die Enter-Taste auf dem Input-Feld
const messageInput = document.getElementById('message-input');
if (messageInput) {
    messageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Verhindert einen Zeilenumbruch im Input-Feld
            sendMessageToServer(); // Aufruf der Funktion zum Senden der Nachricht
        }
    });
}

// Funktion, um den Benutzer auszuloggen
function logout() {
    // Session Storage leeren
    sessionStorage.clear();

    // Weiterleitung zur Login-Seite
    window.location.href = 'index.html';
}

// Event-Handler für den Logout-Button
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); // Verhindert das Standardverhalten des Buttons
        logout(); // Ruft die Logout-Funktion auf
    });
}

// Funktion, um Nachrichten regelmäßig neu zu laden
function reloadMessages() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.messages) {
                        displayMessages(response.messages);
                        scrollToBottom();
                    } else {
                        console.error('Fehler: messages nicht gefunden.');
                    }
                } catch (error) {
                    console.error('Fehler beim Parsen der JSON-Daten:', error);
                }
            } else {
                console.error('Fehler beim Abrufen der Nachrichten. Status:', xhr.status);
            }
        }
    };

    xhr.open('GET', 'http://127.0.0.1:80/get_messages', true);
    xhr.send();
}

// Lade die Nachrichten sofort, um sie anzuzeigen
window.addEventListener('load', function() {
    loadMessages();
    
    // Setze den Intervall für das regelmäßige Laden der Nachrichten (z.B. alle 10 Sekunden)
    setInterval(reloadMessages, 3000); // Hier alle 3 Sekunden (3000 Millisekunden) anpassen
});

function showNotification() {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = 'Bitte warten...';

    document.body.appendChild(notification);

    // Schließen der Benachrichtigung nach 3 Sekunden (3000 Millisekunden)
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

window.addEventListener('load', loadUsername);
window.addEventListener('load', loadMessages);
