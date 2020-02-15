# Uros Krcadinac 2020
# Main App

import sys
from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_frozen import Freezer
import json

app = Flask(__name__)

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'content'
POST_DIR = 'posts'

STATIC_DIR = 'static'
DATA_DIR = 'data'
PICTOGRAMS_FILE = 'pictograms.json'
PICTOGRAMS_PATH = '{}/{}/{}'.format(STATIC_DIR, DATA_DIR, PICTOGRAMS_FILE)

EN = ["en"]
SH = ["sh"]

app = Flask(__name__)
flatpages = FlatPages(app)
freezer = Freezer(app)
app.config.from_object(__name__)


def getPictoData():
    with open(PICTOGRAMS_PATH, encoding="utf8") as json_file:
        data = json.load(json_file)
    return data


@app.route("/")
@app.route("/work/")
def home():
    return render_template('home.html', lang=EN, pictoData=getPictoData())


@app.route("/rad/")
def home_s():
    return render_template('home_s.html', lang=SH, pictoData=getPictoData())


@app.route("/posts/")
def posts():
    posts = [p for p in flatpages if p.path.startswith(POST_DIR)]
    posts.sort(key=lambda item: item['date'], reverse=False)
    return render_template('posts.html', posts=posts)


@app.route('/posts/<name>/')
def post(name):
    path = '{}/{}'.format(POST_DIR, name)
    post = flatpages.get_or_404(path)
    return render_template('post.html', post=post)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        # app.run(host='0.0.0.0', debug=True)
        app.run(host='127.0.0.1', debug=True)
