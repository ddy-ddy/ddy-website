/*
 * @Author: Yu Duan 1179730251@qq.com
 * @Date: 2022-06-10 23:23:34
 * @LastEditTime: 2022-06-22 22:42:33
 * @Github: https://github.com/ddy-ddy
 * @Website: https://ddy-ddy.com
 */
import { BASE_URL, BASE } from "$lib/variables";

export async function get() {
    const res = await fetch(`${BASE_URL}/blog-categories?populate=*`);
    const response = await res.json();
    const categories = response["data"];
    categories.map((category) => {
        category.title = category.attributes.title;  //类别名
        category.description = category.attributes.description;  //类别描述
        category.blogNumber = category.attributes.blogs.data.length; //该类别博客数量
        // 判断图像是否有小尺寸的，有就用小尺寸的
        if (category.attributes.avatar.data.attributes.formats) {
            category.avatar = BASE + category.attributes.avatar.data.attributes.formats.medium.url; //该类别avatar
        } else {
            category.avatar = BASE + category.attributes.avatar.data.attributes.url;
        }

    })
    return {
        status: 200,
        body: categories
    }
}