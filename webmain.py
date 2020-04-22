# Uros Krcadinac 2020
# Main App

import sys
from flask import Flask, render_template, send_file, redirect
from flask_flatpages import FlatPages
from flask_frozen import Freezer
import utils
from langutil import LangUtilEn, LangUtilSh

app = Flask(__name__)

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'content'
PROJECTS_DIR = 'projects'
PROJECTS_SH_DIR = '_projects_s'

app = Flask(__name__)
flatpages = FlatPages(app)
freezer = Freezer(app)
app.config.from_object(__name__)

en = LangUtilEn(flatpages)
sh = LangUtilSh(flatpages)


# BASE ROUTES
# homepages in english and serbian

@app.route("/")
def false_home():
    return render_template('test/falsebase.html', params=en.params())


@app.route("/work/")
def home():
    return render_template('home.html', params=en.params())


@app.route("/rad/")
def home_s():
    return render_template('home.html', params=sh.params())


# PROJECT LIST SECTION
# rendering project_list.html

@app.route("/work/projects/")
def projects():
    list, data = utils.projects(flatpages, en, PROJECTS_DIR)
    return render_template('project_list.html', projects=list, params=en.params(), data=data)


@app.route("/rad/projekti/")
def projects_s():
    list, data = utils.projects(flatpages, sh, PROJECTS_SH_DIR)
    return render_template('project_list.html', projects=list, params=sh.params(), data=data)


# PROJECTS FILTERED
# rendering filtered list of projects, also project_list.html

@app.route("/work/projects/<by>/<criteria>")
def projects_by_category(by, criteria):
    list, data = utils.projects_by_category(flatpages, en, PROJECTS_DIR, by, criteria)
    return render_template('project_list.html', projects=list, params=en.params(), data=data)


@app.route("/rad/projekti/<by>/<criteria>")
def projects_by_category_s(by, criteria):
    list, data = utils.projects_by_category(flatpages, sh, PROJECTS_SH_DIR, by, criteria)
    return render_template('project_list.html', projects=list, params=sh.params(), data=data)


# PROJECT SECTION
# rendering project.html

@app.route('/work/projects/<name>/')
def project(name):
    this_project = flatpages.get_or_404('{}/{}'.format(PROJECTS_DIR, name))
    return render_template('project.html', project=this_project, params=en.params())


@app.route('/rad/projekti/<name>/')
def project_s(name):
    this_project = flatpages.get_or_404('{}/{}'.format(PROJECTS_SH_DIR, name))
    return render_template('project.html', project=this_project, params=sh.params())


# TESTING SECTION
# alternative design

@app.route('/work/projects1/<name>/')
def project1(name):
    path = '{}/{}'.format(PROJECTS_DIR, name)
    this_project = flatpages.get_or_404(path)
    return render_template('project1.html', project=this_project, params=en.params())


# ADDITIONAL ROUTES
# synesketch, download, etc.

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


@app.route('/3/')
def poem():
    return render_template('test/3.html')


# MAIN
# starting app

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        # app.run(host='0.0.0.0', debug=True)
        app.run(host='127.0.0.1', debug=True)
        # app.run(host='0.0.0.0')
