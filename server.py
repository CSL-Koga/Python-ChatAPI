from loginsystem import authenticate_user, register_user, delete_user
import getpass
import os
import ctypes
from database import getData, storeData
from ErrorHandler import ThrowError
from message import add_message, display_message
from flask import Flask, request

# Hier wird der Server eingestellt
app = Flask(__name__)

@app.route('/login')
def login():
	username = request.arg.get('username')
	password = request.arg.get('password')

	userid = authenticate_user(username, password, getData())

	if userid > -1:
		return "1"

	return "0"

@app.route('/msg')
def msg():
	msg_content = request.args.get('msg')
	username = request.args.get('user')

	test = msg_content, username

	try:
		add_message(msg_content, username, getData())
		return "1"
	except Exception:
		return "0"

@app.route('/delete_user')
def delete():
	username = request.arg.get('username')
	password = request.arg.get('password')

	delete_user(username, password, getData())

if __name__ == '__main__':
	# run app in debug mode on port 5000
	app.run(debug=True, port=5000)