export async function get() {
    const res = await fetch("http://121.4.85.24:1337/api/blog-categories?populate=*");
    const response = await res.json();
    const categories = response["data"];
    categories.map((category) => {
        category.title = category.attributes.title;  //类别名
        category.description = category.attributes.description;  //类别描述
    })
    return {
        status: 200,
        body: categories
    }
}