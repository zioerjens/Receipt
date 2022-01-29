import json
import os
from os import listdir
from os.path import isfile, join
from urllib.parse import unquote

import mysql.connector
from flask import Flask, send_file, request
from flask_cors import CORS
from flask_restful import Api

from ReceiptService import *

store_dir = os.getcwd() + '\\Downloads'

app = Flask(__name__)
api = Api(app)
CORS(app)  # For limiting the request urls
global connection
connection = mysql.connector.connect(user='backend', password='1234', host='127.0.0.1', database='receiptDB')

# Restrict request Urls
# TODO add webapp url and test this so only authenticated users can send requests
app.config["CORS_ORIGINS"] = ["https://your-web-app.com", "http://localhost:4200"]


# ROUTES /pdf


@app.route('/pdf/<pdf_name>')
def download_by_name(pdf_name):
    unquoted_id = unquote(pdf_name)
    return send_file(store_dir + '\\' + unquoted_id)


@app.route('/pdf/all')
def all_pdfs():
    all_files = [f for f in listdir(store_dir) if isfile(join(store_dir, f))]
    # convert to json to return to the frontend
    all_files_json = json.dumps(all_files)
    return all_files_json, 200


# ROUTES /receipt


@app.route('/receipt/all')
def all_receipts():
    return json.dumps(get_all_receipts())


@app.route('/receipt', methods=['POST', 'PUT'])
def create_update_delete_receipt():
    if request.method == 'POST':
        receipt = map_frontend_to_backend_receiptDTO(request.get_json())
        create_receipt(receipt)
        return 'not yet implemented', 200

    if request.method == 'PUT':
        update_receipt(request.form)
        return 'not yet implemented', 200


if __name__ == '__main__':
    app.run()
