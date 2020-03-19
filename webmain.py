# Uros Krcadinac 2020
# Main App

import json
import os
import os.path
import sys
from datetime import date, datetime

from flask import Flask, render_template, send_file, redirect
from flask_flatpages import FlatPages
from flask_frozen import Freezer

app = Flask(__name__)

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'content'

PROJECTS_DIR = 'projects'
# 'posts'

STATIC_DIR = 'static'
DATA_DIR = 'data'
PICTOGRAMS_FILE = 'pictograms.json'
PICTOGRAMS_PATH = '{}/{}/{}'.format(STATIC_DIR, DATA_DIR, PICTOGRAMS_FILE)

EN = ["en",
      {
          "base": "/work/projects/",
          "category": "category/",
          "role": "role/",
          "medium": "medium/"
      }]
SH = ["sh",
      {
          "base": "/rad/projekti/",
          "category": "kategorija/",
          "role": "uloga/",
          "medium": "medijum/"
      }]

app = Flask(__name__)
flatpages = FlatPages(app)
freezer = Freezer(app)
app.config.from_object(__name__)

params = {}
max_project_count = 0
project_pages = [p for p in flatpages if p.path.startswith(PROJECTS_DIR)]


# Utility Functions

def setup_params(language):
    global params
    if not params:
        data = get_pictogram_data()
        for tag in data:
            tag["projects"] = project_count_by_category(tag["id"])
        params = {"lang": language[0],
                  "pictodata": data,
                  "max": max_project_count,
                  "project_paths": language[1]}
    else:
        params["lang"] = language[0]
        params["project_paths"] = language[1]
    return params


def get_pictogram_data():
    with open(PICTOGRAMS_PATH, encoding="utf8") as json_file:
        data = json.load(json_file)
    return data


def project_count_by_category(tag):
    global max_project_count

    projects_tagged = list(filter(lambda x: (tag in map(lambda d: d["id"], x["category"])), project_pages))

    projects_data = []
    birth_year = datetime.strptime("1984", "%Y").year
    now_year = date.today().year

    for year in range(birth_year, now_year + 1):
        i = year - birth_year
        count_by_year = len(list(filter(lambda x: (year == x["date"]), projects_tagged)))
        if count_by_year > max_project_count:
            max_project_count = count_by_year
        projects_data.insert(i, {"year": str(year), "projectCount": count_by_year})

    return projects_data


# Flask Routes and Functions

@app.route("/")
def false_home():
    return render_template('test/falsebase.html', params=setup_params(EN))


@app.route("/work/")
def home():
    return render_template('en/home.html', params=setup_params(EN))


@app.route("/rad/")
def home_s():
    return render_template('sh/home_s.html', params=setup_params(SH))


@app.route("/test-scroll/")
def test_scroll():
    return render_template('test/testscroll.html')


@app.route("/work/projects/")
def projects():
    projects = [p for p in flatpages if p.path.startswith(PROJECTS_DIR)]
    projects.sort(key=lambda item: item['date'], reverse=True)
    return render_template('test/posts.html', projects=projects)


@app.route("/work/projects/<by>/<criteria>")
def projects_by_category(by, criteria):
    filtered_projects = list(filter(lambda x: (criteria in map(lambda d: d["id"], x[by])), project_pages))
    filtered_projects.sort(key=lambda item: item['date'], reverse=True)
    return render_template('test/posts.html', projects=filtered_projects, params=setup_params(EN))


@app.route('/work/projects/<name>/')
def project(name):
    path = '{}/{}'.format(PROJECTS_DIR, name)
    img_path = '{}/{}/{}/{}/{}'.format("static", "media", "projects", name, "img")
    thumb_path = '{}/{}/{}/{}/{}'.format("static", "media", "projects", name, "thumbs")
    this_project = flatpages.get_or_404(path)

    # n = {"img": len([n for n in os.listdir(img_path) if os.path.isfile(os.path.join(img_path, n))]),
    #      "thumbs": len([n for n in os.listdir(thumb_path) if os.path.isfile(os.path.join(thumb_path, n))])}

    return render_template('en/project.html', project=this_project, params=setup_params(EN))


@app.route('/synesketch/')
def synesketch():
    return redirect("/work/projects/synesketch", code=302)


@app.route('/download/<path:args>')
def download_file(args=None):
    items = args.split("/")
    path = '{}/{}'.format("static", "download")
    for i in items:
        path = path + "/" + i
    print(path)
    # return send_file(path, as_attachment=True)
    return send_file(path)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        # app.run(host='0.0.0.0', debug=True)
        app.run(host='127.0.0.1', debug=True)
        # app.run(host='0.0.0.0')
