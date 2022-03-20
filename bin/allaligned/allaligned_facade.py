import os
import json
import time
import glob
from random import randint


class MyFlagFacadeUtil:

    def __init__(self):
        self.input_ponders_path = 'static/space/svesvrstani/conf/input-ponders.json'
        self.lang_path = 'static/space/svesvrstani/conf/allaligned-multilang.json'
        self.database_path = 'static/space/svesvrstani/database/'

        with open(self.lang_path, encoding="utf8") as json_file:
            self.lang = json.load(json_file)

    def save_data(self, data):
        data = json.loads(data)
        time_stamp = time.strftime("%Y%m%d-%H%M%S") + "_" + str(time.time() * 1000)
        time_stamp = time_stamp + '_' + str(randint(100, 1000))
        file_name = self.database_path + time_stamp + '.json'
        with open(file_name, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

    def delete_data(self, file_name):
        # file_name = json.loads(data)
        # os.remove(self.database_path + file_name)
        os.remove(file_name)

    def read_data(self):
        path = self.database_path + "*"
        db = []
        for file_name in glob.iglob(path):
            d = open(file_name, "r").read()
            d = json.loads(d)
            d["file_name"] = file_name
            d = json.dumps(d)
            print(d)
            db.append(d)
        return db

    def flag_mappings(self, language):
        lang_key = language + "_params"
        lp = self.lang[lang_key]["myflag"]
        with open(self.input_ponders_path, encoding="utf8") as json_file:
            input_ponders = json.load(json_file)
        mappings = {}

        def data_for_type(t):
            if t == "unipolar":
                return {"min": 0, "max": 1, "step": 0.1, "value": 0}
            else:
                return {"min": -1, "max": 1, "step": 0.2, "value": 0}

        for p in input_ponders:
            md = input_ponders[p]['meta_data']
            mappings[p] = {
                # "label": md['label'],
                # "label_sr": md['label_sr'],
                "label": md[lp["slider_label"]],
                "type": md['type'],
                "data": data_for_type(md['type'])
            }

        return lp, json.dumps(mappings)
