import base64
import logging
import os

from pymongo import MongoClient, UpdateOne
from pymongo.errors import BulkWriteError
from urllib.parse import quote_plus

from database.DBError import DBError


class MongoHelper(object):

    def __init__(self, username, password, database, host, log=True):
        # Create URL object to connect to database
        username = quote_plus(username)
        password = quote_plus(password)
        self.url = "mongodb://%s:%s@%s/?authSource=%s" % (username, password, host, str(database))
        self.database = database

        # Establish a connection
        self.client = None
        self.db_con = None
        self.connect()

    @staticmethod
    def init_mongo_helper():
        # Initialize mongo helper from config
        host = f'{os.getenv("DJANGO_APP_DB_HOST")}:{int(os.getenv("DJANGO_APP_DB_PORT"))}'
        return MongoHelper(username=os.getenv('DJANGO_APP_DB_USER'),
                                        password=os.getenv('DJANGO_APP_DB_PASSWORD'),
                                        database=os.getenv('DJANGO_APP_DB_NAME'),
                                        host=host)

    def connect(self):

        # Create an engine
        try:
            self.client = MongoClient(self.url)
            self.db_con = self.client[self.database]

        except BaseException as e:
            logging.error("Unable to connect to Mongo database!")
            if e != "":
                logging.error("Received the following error message: %s" % e)

            raise DBError("Unable to connect to the Mongo database!")

    def disconnect(self):

        self.client.close()

    def bulk_status_update(self, requests):
        try:
            self.db_con.tasks.bulk_write(requests, ordered=False)
        except BulkWriteError as bwe:
            logging.error(bwe.details)
