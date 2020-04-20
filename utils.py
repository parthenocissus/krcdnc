from itertools import groupby

def projects (flatpages, dir):
    project_list = [p for p in flatpages if p.path.startswith(dir)]
    project_list.sort(key=lambda item: (item['date'], item['featured']), reverse=True)
    project_list_grouped = [{"year": y, "projects": list(i)}
                            for y, i in groupby(project_list, lambda item: item['date'])]
    project_data = [{"year": y, "projects": len(list(i))}
                    for y, i in groupby(project_list, lambda item: item['date'])]
    return project_list_grouped, project_data

def projects_by_category(flatpages, dir, by, criteria):
    project_pages = [p for p in flatpages if p.path.startswith(dir)]
    filtered_projects = list(filter(lambda x: (criteria in map(lambda d: d["id"], x[by])), project_pages))
    filtered_projects.sort(key=lambda item: (item['date'], item['featured']), reverse=True)
    project_list_grouped = [{"year": y, "projects": list(i)} for y, i in
                            groupby(filtered_projects, lambda item: item['date'])]
    # TODO
    project_data = ""
    return project_list_grouped, project_data