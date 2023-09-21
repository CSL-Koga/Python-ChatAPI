import hashlib
from database import storeData

def delete_user(username, password, data):
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    for user in data['users']:
        if user['username'] == username:
            if user['password'] == hashed_password:
                data['users'].remove(user)
                storeData(data)
                return 1

    return 0

def register_user(username, password, data):
    # Hash das Passwort, bevor es in die Datenbank gespeichert wird
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    
    new_user = {
    'username': username,
    'password': hashed_password,
    'logins': 1
    }

    data['users'].append(new_user)

    # Füge den Benutzer zur Datenbank hinzu
    storeData(data)

def authenticate_user(username, password, data):
    # Hash das eingegebene Passwort, um es mit dem in der Datenbank gespeicherten Hash zu vergleichen
    hashed_password = str(hashlib.sha256(password.encode()).hexdigest())

    num_users = len(data["users"])
    counter = 0

    while counter != num_users:
        userid = counter

        if data["users"][int(userid)]["password"] == hashed_password:
            if str(data["users"][int(userid)]["username"]) == username:
                data["users"][int(userid)]["logins"] = data["users"][int(userid)]["logins"]+1
                storeData(data)

                return userid
        counter += 1

    return -1
    
# Beispiel für die Verwendung des Login-Systems
if __name__ == "__main__":
    while True:
        print("1. Registrieren")
        print("2. Einloggen")
        print("3. Beenden")
        
        choice = input("Wähle eine Option: ")
        
        if choice == '1':
            username = input("Gib deinen Benutzernamen ein: ")
            password = input("Gib dein Passwort ein: ")
            register_user(username, password)
        
        elif choice == '2':
            username = input("Gib deinen Benutzernamen ein: ")
            password = input("Gib dein Passwort ein: ")
            if authenticate_user(username, password):
                print("Login erfolgreich!")
            else:
                print("Ungültige Anmeldeinformationen.")
        
        elif choice == '3':
            break
        
        else:
            print("Ungültige Option. Bitte versuche es erneut.")
