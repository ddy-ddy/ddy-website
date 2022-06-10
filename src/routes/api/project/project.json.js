function splitString(info) {
    info = info.split("T");
    info = info[0];
    return info;
}

export async function get() {
    let res = await fetch(`http://121.4.85.24:1337/api/projects?sort[0]=publishedAt:DESC`)
    let response = await res.json();
    let projects = response["data"];
    projects.map((project) => {
        project.title = project.attributes.title; //项目名
        project.description = project.attributes.description; //项目描述
        project.isOnline = project.attributes.isOnline; //项目是否上线
        if (project.attributes.isOnline) {
            project.webLink = project.attributes.webLink;//项目链接
        }
        project.githubLink = project.attributes.githubLink;//github链接
        project.publishedTime = splitString(project.attributes.publishedAt);//项目发布时间
        project.attributes = ""
    })
    return {
        status: 200,
        body: projects
    }
}