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

        base_path = 'static/data/'
        multilang_path = base_path + "multilang.json"
        picto_path = base_path + 'pictograms.json'

        with open(multilang_path, encoding="utf8") as json_file:
            lang_data = json.load(json_file)

        self.en_data = lang_data["en_params"]
        self.sh_data = lang_data["sh_params"]

        with open(picto_path, encoding="utf8") as json_file:
            pictogram_data = json.load(json_file)

        for tag in pictogram_data:
            tag["projects"] = self.__project_count_by_category(tag["id"])

        self.en_data["pictodata"] = pictogram_data
        self.sh_data["pictodata"] = LangUtil.__fix_sh_pictodata(pictogram_data)

        self.en_data["max"] = self.max_project_count
        self.sh_data["max"] = self.max_project_count

    def en(self):
        return self.en_data

    def sh(self):
        return self.sh_data

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

    @staticmethod
    def __fix_sh_pictodata(pictogram_data):
        new_data = copy.deepcopy(pictogram_data)
        for p in new_data:
            p["name"] = p["nameS"]
        return new_data

    @staticmethod
    def prepare_sh_project(page):
        page.meta["title"] = page.meta["title_s"]
        for c in page.meta["category"]:
            c["name"] = c["name_s"]
        for r in page.meta["role"]:
            r["name"] = r["name_s"]
        for m in page.meta["medium"]:
            m["name"] = m["name_s"]
        for p in page.meta["presentations"]:
            for e in p["events"]:
                e["name"] = e["name_s"]
        if "team" in page.meta:
            for t in page.meta["team"]:
                t["name"] = t["name_s"]
        if "team" in page.meta:
            for t in page.meta["team"]:
                t["name"] = t["name_s"]
        return page
