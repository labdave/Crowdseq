import logging
from django.http import HttpResponse

# Get an instance of a logger
logger = logging.getLogger(__name__)

# VIEWS FOR K8S READINESS AND LIVELINESS


def liveliness(request):
    return HttpResponse("OK")


def readiness(request):
    return HttpResponse("OK")