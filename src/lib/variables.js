/*
 * @Author: Yu Duan 1179730251@qq.com
 * @Date: 2022-05-17 20:18:57
 * @LastEditTime: 2022-07-10 22:57:36
 * @Github: https://github.com/ddy-ddy
 * @Website: https://ddy-ddy.com
 */
// 存放变量，路径等

//strapi url
export const BASE_URL = 'https://www.ddy-backend.xyz/api';
export const BASE = 'https://www.ddy-backend.xyz';

//MeiliSearch url
export const MeiliSearch_URL = 'http://121.4.85.24:7700';

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