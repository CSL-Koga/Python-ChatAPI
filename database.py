import requests
import pprint
import json

BIN_URL = "https://api.jsonbin.io/v3/b/6509f6d0ce39bb6dce7f295f"

def getData():
	headers = {
	  'X-Master-Key': '$2b$10$WJB4..4WhCA55LBQtb1ZtOwcg4N.op1xdj/ie2TN/fqbNrqa0kUQ6'
	}

	req = requests.get(BIN_URL, json=None, headers=headers)

	response = json.loads(str(req.text))

	return response["record"]

def storeData(data):
	headers = {
	  'Content-Type': 'application/json',
	  'X-Master-Key': '$2b$10$WJB4..4WhCA55LBQtb1ZtOwcg4N.op1xdj/ie2TN/fqbNrqa0kUQ6'
	}

	req = requests.put(BIN_URL, json="", headers=headers)
	req = requests.put(BIN_URL, json=data, headers=headers)

getData()
