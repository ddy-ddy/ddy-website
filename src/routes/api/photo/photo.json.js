/*
 * @Author: Yu Duan 1179730251@qq.com
 * @Date: 2022-05-17 20:21:24
 * @LastEditTime: 2022-07-11 23:06:13
 * @Github: https://github.com/ddy-ddy
 * @Website: https://ddy-ddy.com
 */
import { BASE_URL, BASE } from "$lib/variables";
import { JudgeHorizontal, splitString } from "$lib/function";


export async function get() {
    const res = await fetch(`${BASE_URL}/photographies?sort[0]=publishedAt:DESC&populate=*`);
    const response = await res.json();
    const photographies = response["data"];
    photographies.map((photography) => {
        photography.shootTime = photography.attributes.shootTime;  //拍摄时间
        photography.title = photography.attributes.title; //文件标题
        photography.image = BASE + photography.attributes.image.data[0].attributes.formats.large.url;  //照片图像
        if (photography.attributes.author.data) {
            photography.author = photography.attributes.author.data.attributes.name;  //作者名
        } else {
            photography.author = "";
        }
        photography.isHorizontal = JudgeHorizontal(photography.attributes.image.data[0].attributes.height, photography.attributes.image.data[0].attributes.width); //判断图片是否是横图
        photography.description = splitString(photography.attributes.description, 12); //图片简要描述
    })
    return {
        status: 200,
        body: photographies,
    }
}