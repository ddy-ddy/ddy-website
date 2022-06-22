/*
 * @Author: Yu Duan 1179730251@qq.com
 * @Date: 2022-05-17 20:24:13
 * @LastEditTime: 2022-06-22 22:44:01
 * @Github: https://github.com/ddy-ddy
 * @Website: https://ddy-ddy.com
 */
import { BASE_URL, BASE } from "$lib/variables";


export async function get(request) {
    const id = request.params.id;
    const res = await fetch(`${BASE_URL}/blogs/${id}?populate=*`);
    const response = await res.json();
    const blog = response["data"];
    blog.title = blog.attributes.title; //博客名
    blog.readTime = blog.attributes.readTime; //博客预计阅读时间
    blog.publishedTime = blog.attributes.publishedAt.split("T")[0]; //博客发布时间
    blog.author = blog.attributes.author.data.attributes.name; //博客作者
    blog.authorLink = blog.attributes.author.data.attributes.link; //博客作者联系方式
    blog.authorLinkName = blog.attributes.author.data.attributes.linkName; //博客作者联系名称
    blog.context = blog.attributes.context; //博客内容

    // 获取作者的头像
    const tempRes = await fetch(`${BASE_URL}/authors/${blog.attributes.author.data.id}?populate=*`);
    const tempResponse = await tempRes.json();
    if (tempResponse.data.attributes.avatar.data.attributes.formats) { //判断图像是否有小尺寸的，有就用小尺寸的
        blog.authorAvatar = BASE + tempResponse.data.attributes.avatar.data.attributes.formats.small.url;
    } else {
        blog.authorAvatar = BASE + tempResponse.data.attributes.avatar.data.attributes.url;

    }


    return {
        status: 200,
        body: blog,
    }
}