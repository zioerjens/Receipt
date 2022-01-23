Installation Backend:

1. py -m ensurepip --upgrade
2. py -m pip install --upgrade pip
3. py -m pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
4. py -m pip install --upgrade flask-restful
5. py -m pip install --upgrade flask
5. py -m pip install --upgrade flask-cors

Set-Up credentials:

1. Go to https://console.cloud.google.com/apis/credentials?project=receipt-338215
2. Download OAuth 2.0 Client IDs as Json
3. Save the Json as credentials.json at project root
4. Login via frontend is possible, the backend saves a token.json when executed the first time
