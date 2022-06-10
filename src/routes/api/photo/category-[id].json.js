function splitString(info) {
    if (info == null) {
        info = "...";
    }
    if (info && info.length >= 30) {
        info = info.slice(0, 30);
        info = info + "...";
    }
    return info;
}

function JudgeHorizontal(height, width) {
    if (width > height) {
        return true;
    }
    else {
        return false;
    }
}

export async function get(request) {
    const id = request.params.id;
    const res = await fetch(`http://121.4.85.24:1337/api/photography-categories/${id}?populate=*`)
    const response = await res.json();
    const categoryInfo = response["data"]["attributes"]; //当前类别的信息
    categoryInfo.id = response["data"]["id"];
    const categoryPhotographies = response["data"]["attributes"]["photographies"]["data"];//某一类的所有照片
    let number = categoryPhotographies.length;
    for (let i = 0; i < number; i++) {
        await fetch(`http://121.4.85.24:1337/api/photographies/${categoryPhotographies[i].id}?populate=*`)
            .then(response => response.json())
            .then(data => {
                data = data["data"];
                categoryPhotographies[i].image = "http://121.4.85.24:1337" + data.attributes.image.data[0].attributes.formats.large.url;  //博客图像
                categoryPhotographies[i].description = splitString(data.attributes.description); //图片简要描述
                categoryPhotographies[i].isHorizontal = JudgeHorizontal(data.attributes.image.data[0].attributes.height, data.attributes.image.data[0].attributes.width); //判断图片是否是横图
                categoryPhotographies[i].shootTime = data.attributes.shootTime;
                categoryPhotographies[i].attributes = ""
            })
    }
    return {
        status: 200,
        body: [categoryInfo, categoryPhotographies]
    }
}
