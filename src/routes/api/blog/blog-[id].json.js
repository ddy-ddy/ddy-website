function splitString(info) {
    info = info.split("T");
    info = info[0];
    return info;
}

export async function get(request) {
    const id = request.params.id;
    const res = await fetch(`http://121.4.85.24:1337/api/blogs/${id}?populate=*`);
    const response = await res.json();
    const blog = response["data"];
    blog.title = blog.attributes.title; //博客名
    blog.readTime = blog.attributes.readTime; //博客预计阅读时间
    blog.publishedTime = splitString(blog.attributes.publishedAt); //博客发布时间
    blog.author = blog.attributes.author.data.attributes.name; //博客作者
    blog.context = blog.attributes.context; //博客内容
    
    return {
        status: 200,
        body: blog,
    }
}