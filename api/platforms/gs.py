import os
import base64
import logging
from urllib.parse import quote_plus
from oauth2client.service_account import ServiceAccountCredentials
from django.conf import settings
from django.utils import timezone
from Aries.storage import StorageObject, StorageFolder


logger = logging.getLogger(__name__)
key_file = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
if not key_file and hasattr(settings, "GOOGLE_APPLICATION_CREDENTIALS"):
    key_file = getattr(settings, "GOOGLE_APPLICATION_CREDENTIALS")

if key_file:
    GOOGLE_APPLICATION_CREDENTIALS = ServiceAccountCredentials.from_json_keyfile_name(
        key_file
    )
else:
    GOOGLE_APPLICATION_CREDENTIALS = None


def sign_url(uri, seconds=3600):
    credentials = GOOGLE_APPLICATION_CREDENTIALS
    client_id = credentials.service_account_email
    epoch = "%d" % timezone.make_naive(timezone.now() + timezone.timedelta(seconds=seconds)).timestamp()
    uri = uri.replace("gs://", "/", 1)
    uri = uri.replace(" ", "%20")
    signature = credentials.sign_blob(
        "GET\n\n\n" + epoch + "\n" + uri
    )[1]
    encoded_signature = base64.b64encode(signature)
    url_suffix = "?GoogleAccessId=" + client_id + "&Expires=" + epoch + "&Signature=" \
                 + quote_plus(encoded_signature.decode())
    return "https://storage.googleapis.com" + uri + url_suffix


def folder_url(uri):
    storage_obj = StorageFolder(uri)
    return "https://console.cloud.google.com/storage/browser/%s%s" % (storage_obj.hostname, storage_obj.path)
