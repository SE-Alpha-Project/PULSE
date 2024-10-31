from flask import Flask
from flask_pymongo import PyMongo
from flask_mail import Mail

class App:
    def __init__(self):
        self.app = Flask(__name__)
        self.app.secret_key = 'secret'
#TODO: Use environment variables to mask the credentials
        self.app.config['MONGO_URI'] = "mongodb+srv://team96:qJ2wLfEuk7dwHVos@team96.aotv5.mongodb.net/test?retryWrites=true&w=majority&appName=Team96"
        self.mongo = PyMongo(self.app)

        self.app.config['MAIL_SERVER'] = 'smtp.gmail.com'
        self.app.config['MAIL_PORT'] = 465
        self.app.config['MAIL_USE_SSL'] = True
        self.app.config['MAIL_USERNAME'] = "bogusdummy123@gmail.com"
        self.app.config['MAIL_PASSWORD'] = "helloworld123!"
        self.mail = Mail(self.app)