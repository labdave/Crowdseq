import logging
from . import gs, s3
from Aries.storage import StorageObject
logger = logging.getLogger(__name__)


platforms = {
    "gs": gs,
    "s3": s3
}


def platform_method(method_name, uri, *args, **kwargs):
    if not uri:
        return None
    scheme = StorageObject(uri).scheme
    if scheme not in platforms:
        logger.error("Scheme %s is not supported. URI: %s" % (scheme, uri))
        return None
    platform_module = platforms.get(scheme)
    # logger.debug("Platform: %s, Method: %s" % (scheme, method_name))
    if not hasattr(platform_module, method_name):
        logger.error("Scheme %s does not support %s" % (scheme, method_name))
        return None
    return getattr(platform_module, method_name)(uri, *args, **kwargs)


def sign_url(uri, seconds=3600):
    """Gets the signed URL for a particular resource.
    """
    if not uri:
        return None
    return platform_method("sign_url", uri, seconds)


def sign_urls(file_paths, seconds=3600):
    """Gets the signed URLs for a list of resources(most likely files).
    Signed URLs can be used to access the data without authentication.
    They will expire after the specific seconds.
    """
    signed_urls = []
    for file_path in file_paths:
        signed_urls.append(sign_url(file_path, seconds))
    return signed_urls


def storage_folder_url(uri):
    return platform_method("folder_url", uri)
