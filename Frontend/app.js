function createAccount() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    showNotification();

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = xhr.responseText;
                if (response === "1") {
                    alert('Account erfolgreich erstellt.');
                } else {
                    console.error('Fehler beim Erstellen des Accounts.');
                }
            } else {
                console.error('Fehler: ' + xhr.status);
            }
        }
    };

    xhr.open('GET', `http://127.0.0.1:80/create_user?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, true);
    xhr.send();
}

function deleteAccount() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    showNotification();

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = xhr.responseText;
                if (response === "1") {
                    alert('Account erfolgreich gelöscht.');
                } else {
                    console.error('Fehler beim Löschen des Accounts.');
                }
            } else {
                console.error('Fehler: ' + xhr.status);
            }
        }
    };

    xhr.open('GET', `http://127.0.0.1:80/delete_user?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, true);
    xhr.send();
}

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
