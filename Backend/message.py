import json
from datetime import datetime
from database import getData, storeData

def add_message(message, from_user, data):
	datestamp = datetime.now()
	
	new_message = {
    'from_user': from_user,
    'timestamp': str(datestamp),
    'message': message
	}

	data['messages'].append(new_message)

	storeData(data)

def display_message(data, username):
	lenght = len(data["messages"])
	counter = 0
	
	while counter != lenght:

		msg = data["messages"][counter]["message"]
		msg_author = data["messages"][counter]["from_user"]

		if msg_author == username:
			print(f"\033[1;32m {str(msg_author)}\u001b[31m → \u001b[37m{str(msg)}\n")
		else:
			print(f"\033[1;31m {str(msg_author)}\u001b[31m → \u001b[37m{str(msg)}\n")
			
		counter += 1