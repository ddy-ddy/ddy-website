import { BASE_URL } from "$lib/variables";



export async function get(request) {
    const id = request.params.id;
    const res = await fetch(`${BASE_URL}/api/photographies/${id}?populate=*`);
    const response = await res.json();
    const photography = response["data"];
    photography.shootTime = photography.attributes.shootTime;  //拍摄时间
    photography.shootPlace = photography.attributes.shootPlace;//拍摄地点
    photography.title = photography.attributes.title; //文件标题
    photography.image = "http://121.4.85.24:1337" + photography.attributes.image.data[0].attributes.url;  //博客图像
    if (photography.attributes.author.data) {
        photography.author = photography.attributes.author.data.attributes.name;  //作者名
    } else {
        photography.author = "";
    }
    photography.camera = photography.attributes.camera; //拍摄设备
    photography.description = photography.attributes.description; //图片简要描述
    return {
        status: 200,
        body: photography,
    }
}