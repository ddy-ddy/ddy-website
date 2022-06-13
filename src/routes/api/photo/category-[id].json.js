import { BASE_URL, BASE } from "$lib/variables";
import { JudgeHorizontal, splitString } from "$lib/function";

export async function get(request) {
    const id = request.params.id;
    const res = await fetch(`${BASE_URL}/photography-categories/${id}?populate=*`)
    const response = await res.json();
    let categoryInfo = response["data"]["attributes"]; //当前类别的信息
    categoryInfo.id = response["data"]["id"];
    let categoryPhotographies = response["data"]["attributes"]["photographies"]["data"];//某一类的所有照片
    let number = categoryPhotographies.length;
    for (let i = 0; i < number; i++) {
        await fetch(`${BASE_URL}/photographies/${categoryPhotographies[i].id}?populate=*`)
            .then(response => response.json())
            .then(data => {
                data = data["data"];
                categoryPhotographies[i].image = BASE + data.attributes.image.data[0].attributes.formats.large.url;  //博客图像
                categoryPhotographies[i].description = splitString(data.attributes.description, 30); //图片简要描述
                categoryPhotographies[i].isHorizontal = JudgeHorizontal(data.attributes.image.data[0].attributes.height, data.attributes.image.data[0].attributes.width); //判断图片是否是横图
                categoryPhotographies[i].shootTime = data.attributes.shootTime;
                categoryPhotographies[i].attributes = ""
            })
    }
    categoryInfo.photographies = ""; //删除占用资源的数据
    return {
        status: 200,
        body: [categoryInfo, categoryPhotographies]
    }
}
