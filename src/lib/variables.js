// 存放变量，路径等

//wordpress url
export const BASE_URL = 'http://121.4.85.24:8082/wordpress';
//wirdoress posts url
export const BLOG_API_RUL = '/wp-json/wp/v2/posts/';

//主页个人信息
export let personInformation = [
    {
        title: 'Project',
        info: 'Record the projects i have done',
        icon: 'img/project.svg',
        route: '/Project/project',
        number: 2
    },
    {
        title: 'Blog',
        info: 'Record written technical blogs',
        icon: 'img/blog.svg',
        route: '/Blog/',
        number: 22
    },
    {
        title: 'Photo',
        info: 'Record the photos taken',
        icon: 'img/photography.svg',
        route: '/Photo/',
        number: 89
    },
    { title: 'News', info: 'Some recent news', icon: 'img/news.svg', route: '/News/', number: 0 },];


//导航栏路由
export let navTag = [
    { name: 'Home', url: '/' },
    { name: 'Project', url: '/Project/project' },
    {
        name: 'Blog',
        url: '',
        nextInfo: [
            { name: 'All Blogs', url: '/Blog' },
            { name: 'All Categories', url: '/Blog/allCategory' },
        ],
    },
    {
        name: 'Photo',
        url: '',
        nextInfo: [
            { name: 'All Photos', url: '/Photo' },
            { name: 'All Categories', url: '/Photo/allCategory' },
        ],
    },
    { name: 'News', url: '/News/' },
];