import { BASE_URL, BASE } from "$lib/variables";
import { JudgeHorizontal } from "$lib/function";

export async function get() {
    const res = await fetch(`${BASE_URL}/photography-categories?populate=*`);
    const response = await res.json();
    const categories = response["data"];
    categories.map((category) => {
        category.title = category.attributes.title;  //类别名
        category.description = category.attributes.description;  //类别描述
        category.avatar = BASE + category.attributes.avatar.data.attributes.formats.large.url; //类别avatar照片
        category.isHorizontal = JudgeHorizontal(category.attributes.avatar.data.attributes.height, category.attributes.avatar.data.attributes.width); //判断avatar照片是否是横图
        category.numberItem = category.attributes.photographies.data.length;  //该分类共有多少照片
    })
    return {
        status: 200,
        body: categories
    }
}