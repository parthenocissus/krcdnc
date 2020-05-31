import copy
import json
from datetime import date, datetime


class LangUtil:
    EN = "en"
    SH = "sh"

    def __init__(self, flatpages):
        self.flatpages = flatpages
        self.max_project_count = 0
        self.projects_dir = 'projects'
        self.pages_dir = 'pages'
        self.data = None

        base_path = 'static/data/'
        multilang_path = base_path + "multilang.json"
        picto_path = base_path + 'pictograms.json'

        with open(multilang_path, encoding="utf8") as json_file:
            self.lang_data = json.load(json_file)
        with open(picto_path, encoding="utf8") as json_file:
            self.pictogram_data = json.load(json_file)
        for tag in self.pictogram_data:
            tag["projects"] = self.__project_count_by_category(tag["id"])

    def params(self):
        return self.data

    def dir(self):
        return self.projects_dir

    def pgdir(self):
        return self.pages_dir

    def get_category_description(self, category):
        category_item = [i for i in self.data["pictodata"] if i["id"] == category][0]
        return category_item["name"]["description"]

    def get_tag_name(self, key, id):
        item = [i for i in self.data[key] if i["id"] == id][0]
        name = item["title"] if key != "pictodata" else item["name"]["title"]
        return name

    def categories_html(self):
        return self.__tag_html("pictodata", "category")

    def roles_html(self):
        return self.__tag_html("roles", "role")

    def mediums_html(self):
        return self.__tag_html("mediums", "medium")

    def __tag_html(self, key, tag):
        html = "<div class='list'>"
        l = len(self.data[key]) - 1
        for i, item in enumerate(self.data[key]):
            link = self.data["paths"]["projects"] + self.data["paths"][tag] + item["id"]
            slash = " / " if i < l else ""
            title = item["title"] if tag != "category" else item["name"]["title"]
            html += "<a id='" + item["id"] + "-anchor' class='anchors' href='" + link + "'>" + title + "</a>" + slash
        html += "</div>"
        return html

    def __project_count_by_category(self, tag):
        project_pages = [p for p in self.flatpages if p.path.startswith(self.projects_dir)]
        projects_tagged = list(filter(lambda x: (tag in map(lambda d: d["id"], x["category"])), project_pages))

        projects_data = []
        birth_year = datetime.strptime("1984", "%Y").year
        now_year = date.today().year

        for year in range(birth_year, now_year + 1):
            i = year - birth_year
            count_by_year = len(list(filter(lambda x: (year == x["date"]), projects_tagged)))
            if count_by_year > self.max_project_count:
                self.max_project_count = count_by_year
            projects_data.insert(i, {"year": str(year), "projectCount": count_by_year})

        return projects_data


class LangUtilEn(LangUtil):

    def __init__(self, flatpages):
        super().__init__(flatpages)
        self.data = self.lang_data['en_params']
        self.data['pictodata'] = self.pictogram_data
        self.data['max'] = self.max_project_count


class LangUtilSh(LangUtil):

    def __init__(self, flatpages):
        super().__init__(flatpages)
        self.projects_dir = '_projects_s'
        self.pages_dir = '_pages_s'
        self.data = self.lang_data['sh_params']
        self.data['pictodata'] = LangUtilSh.__fix_sh_pictodata(self.pictogram_data)
        self.data['max'] = self.max_project_count

    @staticmethod
    def __fix_sh_pictodata(pictogram_data):
        new_data = copy.deepcopy(pictogram_data)
        for p in new_data:
            p['name'] = p['nameS']
        return new_data
