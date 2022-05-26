import logging
import boto3
from Aries.storage import StorageObject, StorageFolder
logger = logging.getLogger(__name__)


def sign_url(uri, seconds=3600):
    client = boto3.client("s3")
    file_obj = StorageObject(uri)
    # The AWS object key does not include the beginning slash of the object path.
    url = client.generate_presigned_url(
        'get_object',
        Params={'Bucket': file_obj.hostname, 'Key': file_obj.path[1:]},
        ExpiresIn=seconds,
    )
    return url


def folder_url(uri):
    storage_obj = StorageFolder(uri)
    return "https://s3.console.aws.amazon.com/s3/buckets/%s%s" % (storage_obj.hostname, storage_obj.path)
