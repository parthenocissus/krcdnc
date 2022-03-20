# Uros Krcadinac 2020
# Main App

import sys
import json
from flask import Flask, render_template, send_file, redirect, request
from flask_flatpages import FlatPages
from flask_frozen import Freezer
import utils
import random
from langutil import LangUtilEn, LangUtilSh

app = Flask(__name__)

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'content'

app = Flask(__name__)
fp = FlatPages(app)
freezer = Freezer(app)
app.config.from_object(__name__)

en = LangUtilEn(fp)
sh = LangUtilSh(fp)


# BASE ROUTES
# homepages in english and serbian


@app.route("/work/")
@app.route("/")
def home():
    return render_template('home.html', params=en.params())


@app.route("/rad/")
def home_s():
    return render_template('home.html', params=sh.params())


# PROJECT LIST SECTION
# rendering project_list.html

@app.route("/work/projects/")
def projects():
    project_list, data = utils.projects(fp, en)
    return render_template('project_list.html', projects=project_list, params=en.params(), data=data)


@app.route("/rad/projekti/")
def projects_s():
    project_list, data = utils.projects(fp, sh)
    return render_template('project_list.html', projects=project_list, params=sh.params(), data=data)


# PROJECTS FILTERED
# rendering filtered list of projects, also project_list.html

@app.route("/work/projects/<by>/<criteria>")
def projects_by_category(by, criteria):
    list, data = utils.projects_by_category(fp, en, by, criteria)
    return render_template('project_list.html', projects=list, params=en.params(), data=data)


@app.route("/rad/projekti/<by>/<criteria>")
def projects_by_category_s(by, criteria):
    list, data = utils.projects_by_category(fp, sh, by, criteria)
    return render_template('project_list.html', projects=list, params=sh.params(), data=data)


# PROJECT SECTION
# rendering project.html

@app.route('/work/projects/<name>/')
def project(name):
    this_project = utils.project(fp, en, name)
    return render_template('project.html', project=this_project, params=en.params())


@app.route('/rad/projekti/<name>/')
def project_s(name):
    this_project = utils.project(fp, sh, name)
    return render_template('project.html', project=this_project, params=sh.params())


# WRITING SECTION
# texts and books

@app.route('/work/writing/')
def writing():
    page, data = utils.writing(fp, en)
    return render_template('page.html', params=en.params(), page=page, data=data)


@app.route('/rad/tekstovi/')
def writing_s():
    page, data = utils.writing(fp, sh)
    return render_template('page.html', params=sh.params(), page=page, data=data)


# TEACHING SECTION
# sillabi and workshops

@app.route('/work/teaching/')
def teaching():
    page, data = utils.teaching(fp, en)
    return render_template('page.html', params=en.params(), page=page, data=data)


@app.route('/rad/edukacija/')
def teaching_s():
    page, data = utils.teaching(fp, sh)
    return render_template('page.html', params=sh.params(), page=page, data=data)


# SPEAKING SECTION
# talks and public lectures

@app.route('/work/speaking/')
def speaking():
    page, data = utils.speaking(fp, en)
    return render_template('page.html', params=en.params(), page=page, data=data)


@app.route('/rad/nastupi/')
def speaking_s():
    page, data = utils.speaking(fp, sh)
    return render_template('page.html', params=sh.params(), page=page, data=data)


# PRESS SECTION
# press and media

@app.route('/work/press/')
def press():
    page, data = utils.press(fp, en)
    return render_template('page.html', params=en.params(), page=page, data=data)


@app.route('/rad/mediji/')
def press_s():
    page, data = utils.press(fp, sh)
    return render_template('page.html', params=sh.params(), page=page, data=data)


# NOTE LIST SECTION
# rendering note_list.html

@app.route("/work/notebook/")
def note_list():
    data = utils.note_list(fp, en)
    return render_template('note_list.html', params=en.params(), data=data)


@app.route("/rad/sveska/")
def note_list_s():
    data = utils.note_list(fp, sh)
    return render_template('note_list.html', params=sh.params(), data=data)


# NOTES SECTION
# rendering note.html

@app.route('/work/notebook/<name>/')
def note(name):
    try:
        this_note = utils.note(fp, en, name)
    except:
        data = utils.note_list(fp, en)
        data["error"] = True
        return render_template('note_list.html', params=en.params(), data=data)
    else:
        return render_template('note.html', project=this_note, params=en.params())


@app.route('/rad/sveska/<name>/')
def note_s(name):
    try:
        this_note = utils.note(fp, sh, name)
    except:
        data = utils.note_list(fp, sh)
        data["error"] = True
        return render_template('note_list.html', params=sh.params(), data=data)
    else:
        return render_template('note.html', project=this_note, params=sh.params())


# TEMPORARY NOTES SECTION
# rendering note.html

@app.route('/work/notebook/tmp/<name>/')
def note_tmp(name):
    this_note = utils.note_tmp(fp, en, name)
    return render_template('note.html', project=this_note, params=en.params())


@app.route('/rad/sveska/tmp/<name>/')
def note_tmp_s(name):
    this_note = utils.note_tmp(fp, sh, name)
    return render_template('note.html', project=this_note, params=sh.params())


# ABOUT SECTION
# biography

@app.route('/work/about/')
def about():
    page, data = utils.about(fp, en)
    return render_template('about.html', params=en.params(), page=page, data=data)


@app.route('/rad/bio/')
def about_s():
    page, data = utils.about(fp, sh)
    return render_template('about.html', params=sh.params(), page=page, data=data)


# SPACE ROUTE
# for specific project pages

@app.route('/space/<name>/')
def space(name):
    return render_template('/space/' + name + '.html')


# BANTUSTAN INTERACTIVE ATLAS
# a special website for interactive maps

@app.route('/bantustan-interactive-atlas/home/')
def bntstn_atlas():
    this_page = utils.bntstn_home(fp, en)
    return render_template('bntstn-atlas/bantustan_home.html', map=this_page, params=en.params())


@app.route('/bantustan-interactive-atlas/pocetna/')
@app.route('/bantustan-interactive-atlas/')
def bntstn_atlas_s():
    this_page = utils.bntstn_home(fp, sh)
    return render_template('bntstn-atlas/bantustan_home.html', map=this_page, params=sh.params())


# prints
@app.route('/bantustan-interactive-atlas/prints/')
def bntstn_atlas_prints():
    this_page = utils.bntstn_home(fp, en, "_prints")
    return render_template('bntstn-atlas/bantustan_prints.html', map=this_page, params=en.params())


@app.route('/bantustan-interactive-atlas/printovi/')
def bntstn_atlas_prints_s():
    this_page = utils.bntstn_home(fp, sh, "_prints")
    return render_template('bntstn-atlas/bantustan_prints.html', map=this_page, params=sh.params())


# maps
@app.route('/bantustan-interactive-atlas/map/<name>/')
def bntstn_map(name):
    this_map = utils.bntstn_map(fp, en, name)
    return render_template('bntstn-atlas/bantustan_map.html', map=this_map, params=en.params())


@app.route('/bantustan-interactive-atlas/mapa/<name>/')
def bntstn_map_s(name):
    this_map = utils.bntstn_map(fp, sh, name)
    return render_template('bntstn-atlas/bantustan_map.html', map=this_map, params=sh.params())


# SVESVRSTANI / ALL-ALIGNED
# a special web app for generating flags

from bin.allaligned.allaligned_facade import MyFlagFacadeUtil

mf = MyFlagFacadeUtil()


@app.route("/mojazastava")
def mojazastava():
    lp, params = mf.flag_mappings("sr")
    return render_template('mojazastava/mojazastava.html', params=params, lp=lp)


@app.route("/myflag")
def myflag():
    lp, params = mf.flag_mappings("en")
    return render_template('mojazastava/mojazastava.html', params=params, lp=lp)


@app.route("/bazazastava")
def bazazastava():
    lp, params = mf.flag_mappings("sr")
    db = json.dumps(mf.read_data())
    return render_template('mojazastava/mojazastava-database.html', params=params, lp=lp, db=db)


@app.route('/_myflagsave', methods=['POST'])
def myflagsave():
    print(request.form['vector'])
    mf.save_data(request.form['vector'])
    return json.dumps({"info": "success"})


@app.route('/_myflagdelete')
def myflagread():
    mf.delete_data(request.args.get('vector'))
    return json.dumps({"info": "success"})


@app.route('/_myflaggenerate')
def myflaggenerate():
    svg = mf.generate_flag(request.args.get('vector'))
    return json.dumps({"svg": svg})


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
    return send_file(path, as_attachment=False, mimetype='application/pdf')
    # return send_file(path)


@app.route('/download-direct/<path:args>')
def download_file_direct(args=None):
    items = args.split("/")
    path = '{}/{}'.format("static", "download")
    for i in items:
        path = path + "/" + i
    print(path)
    return send_file(path, as_attachment=True)


# @app.route('/3/')
# def poem():
#     return render_template('test/3.html')


@app.route("/google1bdd97353f81ca5c.html")
def google_site_verf():
    return render_template("test/google1bdd97353f81ca5c.html")


# MAIN
# starting app

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        # app.run(host='0.0.0.0', debug=True)
        app.run(host='127.0.0.1', debug=True)
        # app.run(host='0.0.0.0')
