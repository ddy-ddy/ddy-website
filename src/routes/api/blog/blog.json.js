/*
 * @Author: Yu Duan 1179730251@qq.com
 * @Date: 2022-05-17 20:21:32
 * @LastEditTime: 2022-06-28 23:14:14
 * @Github: https://github.com/ddy-ddy
 * @Website: https://ddy-ddy.com
 */
import { BASE_URL } from "$lib/variables";

export async function get() {
    let res = await fetch(`${BASE_URL}/blogs?sort[0]=publishedAt:DESC&filters[blogTheme]=technologyBlog`)
    let response = await res.json();
    let blogs = response["data"];
    blogs.map((blog) => {
        blog.title = blog.attributes.title; //博客名
        blog.description = blog.attributes.description; //博客简要描述
        blog.readTime = blog.attributes.readTime; //博客预计阅读时间
        blog.publishedTime = blog.attributes.publishedAt.split("T")[0]; //博客发布时间
        blog.blogTheme = blog.attributes.blogTheme; //博客主题
        blog.attributes = "";
    })
    return {
        status: 200,
        body: blogs,
    }
}