from itertools import groupby


def teaching(flatpages, lang):
    page = flatpages.get_or_404('{}/{}'.format(lang.pgdir(), "teaching"))
    params = lang.params()
    data = {
        "link": params["menu_items"][3]["link"],
        "title": params["menu_items"][3]["title"],
        "langlink": params["pages_captions"]["teaching_lang_link"]
    }
    return page, data


def speaking(flatpages, lang):
    page = flatpages.get_or_404('{}/{}'.format(lang.pgdir(), "speaking"))
    params = lang.params()
    data = {
        "link": params["menu_items"][4]["link"],
        "title": params["menu_items"][4]["title"],
        "langlink": params["pages_captions"]["speaking_lang_link"]
    }
    return page, data


def press(flatpages, lang):
    page = flatpages.get_or_404('{}/{}'.format(lang.pgdir(), "press"))
    params = lang.params()
    data = {
        "link": params["menu_items"][5]["link"],
        "title": params["menu_items"][5]["title"],
        "langlink": params["pages_captions"]["press_lang_link"]
    }
    return page, data


def writing(flatpages, lang):
    diglit = "digital-literature"
    bantu = "bantustan-book"
    research = "research"
    by = "category"
    page = flatpages.get_or_404('{}/{}'.format(lang.pgdir(), "writing"))
    projs = [p for p in flatpages if p.path.startswith(lang.dir())]
    bantu_page = flatpages.get_or_404('{}/{}'.format(lang.dir(), bantu))
    prose_projects = [bantu_page]
    diglit_projs = list(filter(lambda x: (x["id"] != bantu) and (diglit in map(lambda d: d["id"], x[by])), projs))
    diglit_projs.sort(key=lambda item: (item['date'], item['featured']), reverse=True)
    research_projs = list(filter(lambda x: (research in map(lambda d: d["id"], x[by])), projs))
    research_projs.sort(key=lambda item: (item['date'], item['featured']), reverse=True)
    data = {
        "projects": [diglit_projs, prose_projects, research_projs]
        # "diglit": diglit_projs, "prose": prose_projects, "research": research_projs
    }
    return page, data


def about(flatpages, lang):
    page = flatpages.get_or_404('{}/{}'.format(lang.pgdir(), "about"))
    project_list = [p for p in flatpages if p.path.startswith(lang.dir())]
    project_list.sort(key=lambda item: (item['date'], item['featured']), reverse=True)
    timeline_data = [{"year": y, "projects": len(list(i))}
                     for y, i in groupby(project_list, lambda item: item['date'])]
    data = {
        "timeline": timeline_data
    }
    return page, data


def projects(flatpages, lang):
    lang_params = lang.params()
    project_list = [p for p in flatpages if p.path.startswith(lang.dir())]
    project_list.sort(key=lambda item: (item['date'], item['featured']), reverse=True)
    project_list_grouped = [{"year": y, "projects": list(i)}
                            for y, i in groupby(project_list, lambda item: item['date'])]
    timeline_data = [{"year": y, "projects": len(list(i))}
                     for y, i in groupby(project_list, lambda item: item['date'])]
    data = {
        "pictoid": "general",
        "lang_link_path": "",
        "tag_title": lang_params["tag_titles"]["all"],
        "name_title": lang_params["tag_titles"]["all_title"],
        "description": lang.categories_html(),
        "timeline": timeline_data
    }
    return project_list_grouped, data


def projects_by_category(flatpages, lang, by, criteria):
    lang_params = lang.params()
    pictoid = "general"
    project_pages = [p for p in flatpages if p.path.startswith(lang.dir())]
    filtered_projects = list(filter(lambda x: (criteria in map(lambda d: d["id"], x[by])), project_pages))
    filtered_projects.sort(key=lambda item: (item['date'], item['featured']), reverse=True)
    project_list_grouped = [{"year": y, "projects": list(i)} for y, i in
                            groupby(filtered_projects, lambda item: item['date'])]
    timeline_data = [{"year": y, "projects": len(list(i))}
                     for y, i in groupby(filtered_projects, lambda item: item['date'])]
    if by == "role":
        desc = lang.roles_html()
        name_title = lang.get_tag_name("roles", criteria)
    elif by == "medium":
        desc = lang.mediums_html()
        name_title = lang.get_tag_name("mediums", criteria)
    else:
        desc = "<div class='text'>" + lang.get_category_description(criteria) + "</div>"
        name_title = lang.get_tag_name("pictodata", criteria)
        pictoid = criteria
    data = {
        "pictoid": pictoid,
        "lang_link_path": by + "/" + criteria,
        "tag_title": lang_params["tag_titles"][by],
        "name_title": name_title,
        "description": desc,
        "timeline": timeline_data
    }
    return project_list_grouped, data
