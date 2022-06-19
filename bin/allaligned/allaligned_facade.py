import os
import json
import time
# import glob
from random import randint

from flask import send_file

from bin.allaligned.flag_generator import GenFlag

from glob import glob, iglob
from io import BytesIO
from zipfile import ZipFile
import os


class MyFlagFacadeUtil:

    def __init__(self):
        self.input_ponders_path = 'static/space/svesvrstani/conf/input-ponders.json'
        self.lang_path = 'static/space/svesvrstani/conf/allaligned-multilang.json'
        self.database_path = 'static/space/svesvrstani/database/'
        self.database2_path = 'static/space/svesvrstani/database2/'
        self.database_final_path = 'static/space/svesvrstani/database_final/'
        self.current_flag_svg = ""

        with open(self.lang_path, encoding="utf8") as json_file:
            self.lang = json.load(json_file)

    def generate_flag(self, data_txt):
        data = json.loads(data_txt)
        gf = GenFlag(raw_input=data, raw=True)
        svg = gf.svg_string()
        svg = f'{svg[:4]} id="flag-svg" viewBox="0 0 150 100" preserveAspectRatio="xMidYMid meet" {svg[5:]}'
        svg = svg.replace('height="100px"', '').replace('width="150px"', '')
        # self.current_flag_svg = svg
        return svg

    def save_data(self, data):
        data = json.loads(data)
        # data['flag'] = self.current_flag_svg
        time_stamp = time.strftime("%Y%m%d-%H%M%S") + "_" + str(time.time() * 1000)
        time_stamp = time_stamp + '_' + str(randint(100, 1000))
        file_name = self.database_path + time_stamp + '.json'
        file_name2 = self.database2_path + time_stamp + '.json'
        with open(file_name, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        with open(file_name2, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

    def delete_data(self, file_name):
        os.remove(file_name)

    def delete_all_data(self):
        path = self.database_path + "*"
        for file_name in iglob(path):
            os.remove(file_name)

    def read_data(self):
        path = self.database_path + "*"
        db = []
        for file_name in iglob(path):
            d = open(file_name, "r", encoding="utf8").read()
            d = json.loads(d)
            d["file_name"] = file_name
            d = json.dumps(d)
            db.append(d)
        db.sort()
        return db

    def read_data_final(self):
        path = self.database_final_path + "*"
        db = []
        for file_name in iglob(path):
            d = open(file_name, "r", encoding="utf8").read()
            d = json.loads(d)
            d["file_name"] = file_name
            d = json.dumps(d)
            db.append(d)
        db.sort()
        return db

    def download_data(self):
        stream = BytesIO()
        target = self.database2_path # database_path
        with ZipFile(stream, 'w') as zf:
            for file in glob(os.path.join(target, '*.json')):
                zf.write(file, os.path.basename(file))
        stream.seek(0)
        return send_file(stream, as_attachment=True, attachment_filename='archive.zip')

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
