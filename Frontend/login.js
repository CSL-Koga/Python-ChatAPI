// Login form submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        showNotification();

        // Send login request to the server
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = xhr.responseText;
                    if (response === "1") {
                        alert('Login successful!');
                        
                        // Store the username in session storage
                        sessionStorage.setItem('username', username);
                        
                        // Redirect to chat.html upon successful login
                        window.location.href = 'chat.html';
                    } else {
                        alert('Login failed. Invalid username or password.');
                    }
                } else {
                    alert('Error: ' + xhr.status);
                }
            }
        };

        xhr.open('GET', `http://127.0.0.1:80/login?username=${username}&password=${password}`, true);
        xhr.send();
    });
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