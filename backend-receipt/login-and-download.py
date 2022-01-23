from __future__ import print_function

import base64
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
store_dir = os.getcwd()


def attachment_download(creds):
    try:
        service = build('gmail', 'v1', credentials=creds)
        results = service.users().messages().list(userId='me', labelIds=[
          'Label_3386902473074528084']).execute()  # XXXX is label id use INBOX to download from inbox
        messages = results.get('messages', [])

        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            for part in msg['payload'].get('parts', ''):

                if part['filename']:
                    filename = part['filename']
                    if os.path.isfile(store_dir + '\\' 'Downloads' + '\\' + filename):
                        print('already downloaded: ' + filename)
                    else:
                        att_id = part['body']['attachmentId']
                        att = service.users().messages().attachments().get(userId='me', messageId=message['id'],
                                                                           id=att_id).execute()
                        data = att['data']

                        file_data = base64.urlsafe_b64decode(data.encode('UTF-8'))
                        path = os.path.join(store_dir + '\\' 'Downloads' + '\\' + filename)

                        with open(path, 'wb') as f:
                            f.write(file_data)
                            f.close()
                            print('downloaded: ' + filename)

    except Exception as error:
        print(error)


def main():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('../token.json'):
        creds = Credentials.from_authorized_user_file('../token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('../credentials.json', SCOPES)
            creds = flow.run_local_server(port=53783)
        # Save the credentials for the next run
        with open('../token.json', 'w') as token:
            token.write(creds.to_json())

    attachment_download(creds)


if __name__ == '__main__':
    main()
