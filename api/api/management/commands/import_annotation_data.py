"""

"""
import pandas as pd
import json
from django.core.management.base import BaseCommand
from Aries.storage import StorageFile

from api.views import process_annotation_file


class Command(BaseCommand):
    """

    See https://docs.djangoproject.com/en/1.11/howto/custom-management-commands/
    """
    help = 'Imports annotation data from an Excel file.'

    def add_arguments(self, parser):
        """Positional arguments

        See https://docs.python.org/3/library/argparse.html for more details about add_argument
        """
        parser.add_argument('annotation_file', type=str, help="local excel file with annotation data")

    def handle(self, *args, **options):

        filename = options['annotation_file']

        if StorageFile(filename).exists():
            xls = pd.ExcelFile(filename, engine='openpyxl')
            feedback_items = process_annotation_file(xls)
            StorageFile("/home/parkerc71/workspace/Crowdseq/api/annotation_import_errors.json").write_string(json.dumps(feedback_items))
