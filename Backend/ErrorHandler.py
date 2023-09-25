import sys
from datetime import datetime

ERROR_RED = "\u001b[31m"
PRINT_WHITE = "\u001b[37m"

def wait_for_input():
	input()

def save_error(errorID):
	with open("errorlog.log", "a") as f:
		if errorID == 1:
			f.write(f"Error 1 - Datenbanken Fehler - {str(datetime.now())}\n")
		if errorID == 2:
			f.write(f"Error 2 - Ungültiger Login - {str(datetime.now())}\n")
		if errorID == 3:
			f.write(f"Error 3 - Fehler beim löschen - {str(datetime.now())}\n")

		f.close()

def ThrowError(errorID):
	if errorID == 1:
		print(f"{ERROR_RED}Datenbank konnte nicht geladen werden. Fehler 1{PRINT_WHITE}")
		save_error(1)
		wait_for_input()
	if errorID == 2:
		print(f"{ERROR_RED}Der Loginversuch war ungültig. Fehler 2{PRINT_WHITE}")
		save_error(2)
		wait_for_input()
	if errorID == 3:
		print(f"{ERROR_RED}Es gab einen Fehler beim löschen des Accounts. Fehler 3{PRINT_WHITE}")
		save_error(3)
		wait_for_input()
