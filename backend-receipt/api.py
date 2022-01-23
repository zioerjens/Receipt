import json
import os
from os import listdir
from os.path import isfile, join
from urllib.parse import unquote

from flask import Flask, send_file
from flask_cors import CORS
from flask_restful import Api

store_dir = os.getcwd() + '\\Downloads'

app = Flask(__name__)
api = Api(app)
CORS(app)

# Restrict request Urls
# TODO add webapp url and test this so only authenticated users can send requests
app.config["CORS_ORIGINS"] = ["https://your-web-app.com", "http://localhost:4200"]


# ROUTES /pdf


@app.route('/pdf/<pdf_id>')
def download_pdf(pdf_id):
    unquoted_id = unquote(pdf_id)
    return send_file(store_dir + '\\' + unquoted_id)


@app.route('/pdf/all')
def all_pdfs():
    all_files = [f for f in listdir(store_dir) if isfile(join(store_dir, f))]
    # convert to json to return to the frontend
    all_files_json = json.dumps(all_files)
    return all_files_json, 200


if __name__ == '__main__':
    app.run()
