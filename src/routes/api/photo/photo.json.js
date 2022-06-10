
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

export async function get() {
    const res = await fetch(`http://121.4.85.24:1337/api/photographies?populate=*`);
    const response = await res.json();
    const photographies = response["data"];
    photographies.map((photography) => {
        photography.shootTime = photography.attributes.shootTime;  //拍摄时间
        photography.title = photography.attributes.title; //文件标题
        photography.image = "http://121.4.85.24:1337" + photography.attributes.image.data[0].attributes.formats.large.url;  //照片图像
        if (photography.attributes.author.data) {
            photography.author = photography.attributes.author.data.attributes.name;  //作者名
        } else {
            photography.author = "";
        }
        photography.isHorizontal = JudgeHorizontal(photography.attributes.image.data[0].attributes.height, photography.attributes.image.data[0].attributes.width); //判断图片是否是横图
        photography.description = splitString(photography.attributes.description); //图片简要描述
    })
    return {
        status: 200,
        body: photographies,
    }
}