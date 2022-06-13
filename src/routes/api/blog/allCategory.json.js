import { BASE_URL } from "$lib/variables";

export async function get() {
    const res = await fetch(`${BASE_URL}/blog-categories?populate=*`);
    const response = await res.json();
    const categories = response["data"];
    categories.map((category) => {
        category.title = category.attributes.title;  //类别名
        category.description = category.attributes.description;  //类别描述
        category.blogNumber = category.attributes.blogs.data.length; //该类别博客数量
    })
    return {
        status: 200,
        body: categories
    }
}