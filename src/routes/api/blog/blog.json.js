function splitString(info) {
    info = info.split("T");
    info = info[0];
    return info;
}

export async function get() {
    let res = await fetch(`http://121.4.85.24:1337/api/blogs?sort[0]=publishedAt:DESC`)
    let response = await res.json();
    let blogs = response["data"];
    blogs.map((blog) => {
        blog.title = blog.attributes.title; //博客名
        blog.description = blog.attributes.description; //博客简要描述
        blog.readTime = blog.attributes.readTime; //博客预计阅读时间
        blog.publishedTime = splitString(blog.attributes.publishedAt); //博客发布时间
        blog.attributes = "";
    })
    return {
        status: 200,
        body: blogs,
    }
}