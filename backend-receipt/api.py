import json
import os
from os import listdir
from os.path import isfile, join
from urllib.parse import unquote

import mysql.connector
from flask import Flask, send_file, request
from flask_cors import CORS
from flask_restful import Api

store_dir = os.getcwd() + '\\Downloads'

app = Flask(__name__)
api = Api(app)
CORS(app)  # For limiting the request urls
connection = mysql.connector.connect(user='backend', password='1234', host='127.0.0.1', database='receiptDB')

# Restrict request Urls
# TODO add webapp url and test this so only authenticated users can send requests
app.config["CORS_ORIGINS"] = ["https://your-web-app.com", "http://localhost:4200"]


# DATABASE

def get_all_receipts():
    cursor = connection.cursor()
    query = "SELECT * FROM receipt"
    cursor.execute(query)
    all_elements = [element for element in cursor]
    return all_elements


def create_receipt(receipt):
    print(receipt)


def update_receipt(receipt):
    print(receipt)

# jsonTest = json.dumps({
#   "name": "new Product",
#   "id": "2917293492",
#   "user": "SVEN",
#   "quantity": "2",
#   "articlePrice": "2.2",
#   "reduced": "1.1",
#   "total": "5.5"
# })

# update_receipt(jsonTest)

def get_receipt(receipt_id):
    cursor = connection.cursor()
    query = "SELECT * FROM receipt WHERE id = " + receipt_id
    cursor.execute(query)
    element = [element for element in cursor]
    return element


def create_update_receipt(receipt):
    if len(get_receipt(receipt.id)) == 1:
        update_receipt(receipt)
    else:
        create_receipt(receipt)
        # create_receipt(receipt_id)


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


@app.route('/receipt', methods=['POST'])
def receipt_by_id():
    create_update_receipt(request.values)


if __name__ == '__main__':
    app.run()
