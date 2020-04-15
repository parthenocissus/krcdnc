# Uros Krcadinac 2020
# Main App

import sys
from flask import Flask, render_template, send_file, redirect
from flask_flatpages import FlatPages
from flask_frozen import Freezer
from itertools import groupby
from langutil import LangUtil

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
lang = LangUtil(flatpages)


# BASE ROUTES
# homepages in english and serbian


@app.route("/")
def false_home():
    # return render_template('test/falsebase.html', params=setup_params(EN))
    return render_template('test/falsebase.html', params=lang.en())


@app.route("/work/")
def home():
    return render_template('home.html', params=lang.en())


@app.route("/rad/")
def home_s():
    return render_template('home.html', params=lang.sh())


# PROJECT LIST SECTION
# rendering project_list.html

@app.route("/work/projects/")
def projects():
    project_list = [p for p in flatpages if p.path.startswith(PROJECTS_DIR)]
    project_list.sort(key=lambda item: item['date'], reverse=True)
    project_list_grouped = [{"year": y, "projects": list(i)} for y, i in groupby(project_list, lambda item: item['date'])]
    return render_template('project_list.html', projects=project_list_grouped, params=lang.en())


@app.route("/rad/projekti/")
def projects_s():
    project_list = [p for p in flatpages if p.path.startswith(PROJECTS_SH_DIR)]
    project_list.sort(key=lambda item: item['date'], reverse=True)
    project_list_grouped = [{"year": y, "projects": list(i)} for y, i in groupby(project_list, lambda item: item['date'])]
    return render_template('project_list.html', projects=project_list_grouped, params=lang.sh())


# PROJECTS FILTERED
# rendering filtered list of projects

@app.route("/work/projects/<by>/<criteria>")
def projects_by_category(by, criteria):
    project_pages = [p for p in flatpages if p.path.startswith(PROJECTS_DIR)]
    filtered_projects = list(filter(lambda x: (criteria in map(lambda d: d["id"], x[by])), project_pages))
    filtered_projects.sort(key=lambda item: item['date'], reverse=True)
    project_list_grouped = [{"year": y, "projects": list(i)} for y, i in groupby(filtered_projects, lambda item: item['date'])]
    return render_template('project_list.html', projects=project_list_grouped, params=lang.en())


@app.route("/rad/projekti/<by>/<criteria>")
def projects_by_category_s(by, criteria):
    project_pages = [p for p in flatpages if p.path.startswith(PROJECTS_SH_DIR)]
    filtered_projects = list(filter(lambda x: (criteria in map(lambda d: d["id"], x[by])), project_pages))
    filtered_projects.sort(key=lambda item: item['date'], reverse=True)
    project_list_grouped = [{"year": y, "projects": list(i)} for y, i in groupby(filtered_projects, lambda item: item['date'])]
    return render_template('project_list.html', projects=project_list_grouped, params=lang.sh())


# PROJECT SECTION
# rendering project.html

@app.route('/work/projects/<name>/')
def project(name):
    this_project = flatpages.get_or_404('{}/{}'.format(PROJECTS_DIR, name))
    return render_template('project.html', project=this_project, params=lang.en())


@app.route('/rad/projekti/<name>/')
def project_s(name):
    this_project = flatpages.get_or_404('{}/{}'.format(PROJECTS_SH_DIR, name))
    # this_project = LangUtil.prepare_sh_project(this_project)
    return render_template('project.html', project=this_project, params=lang.sh())


# TESTING SECTION
# alternative design

@app.route('/work/projects1/<name>/')
def project1(name):
    path = '{}/{}'.format(PROJECTS_DIR, name)
    this_project = flatpages.get_or_404(path)
    return render_template('project1.html', project=this_project, params=lang.en())


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


# MAIN
# starting app

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        # app.run(host='0.0.0.0', debug=True)
        app.run(host='127.0.0.1', debug=True)
        # app.run(host='0.0.0.0')
