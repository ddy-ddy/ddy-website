import { BASE_URL } from "$lib/variables";

export async function get(request) {
    const id = request.params.id;
    const res = await fetch(`${BASE_URL}/blog-categories/${id}?populate=*`)
    const response = await res.json();
    //当前类别的信息
    let categoryInfo = response["data"]["attributes"];
    categoryInfo.id = response["data"]["id"];
    //某一类的所有博客的信息
    let categoryBlogs = response["data"]["attributes"]["blogs"]["data"];
    let number = categoryBlogs.length;
    for (let i = 0; i < number; i++) {
        await fetch(`${BASE_URL}/blogs/${categoryBlogs[i].id}`)
            .then(response => response.json())
            .then(data => {
                data = data["data"];
                categoryBlogs[i].title = data.attributes.title; //博客名
                categoryBlogs[i].description = data.attributes.description; //博客简要描述
                categoryBlogs[i].publishedTime = data.attributes.publishedAt.split("T")[0]; //博客发布时间
                categoryBlogs[i].attributes = "";
            })
    }
    categoryInfo.blogs = ""; //删除占用资源的数据
    return {
        status: 200,
        body: [categoryInfo, categoryBlogs]
    }
}