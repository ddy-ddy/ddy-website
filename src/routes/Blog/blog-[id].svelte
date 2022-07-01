<script context="module">
  export async function load({ params, fetch }) {
    const id = params.id;
    const res = await fetch(`/api/blog/blog-${id}.json`);
    const blog = await res.json();
    return {
      props: {
        blog,
      },
    };
  }
</script>

<script>
  import { page } from '$app/stores';
  import Breadcrumb from '$lib/component/contentLayout/breadCrumb.svelte';
  import BackToTop from '$lib/component/utility/backToTop.svelte';
  import Showdown from 'showdown';
  import ShowdownToc from 'showdown-toc';
  import hljs from 'highlight.js/lib/core';
  import shell from 'highlight.js/lib/languages/shell';
  import javascript from 'highlight.js/lib/languages/javascript';
  import python from 'highlight.js/lib/languages/python';
  import bash from 'highlight.js/lib/languages/bash';
  import codetheme from 'svelte-highlight/styles/github-dark-dimmed';
  import { afterUpdate } from 'svelte';

  // 解析strapi得到的博客内容为html
  export let blog;
  const context = blog.context; //博客的内容
  const toc = []; //博客目录
  Showdown.setOption('tables', true);
  Showdown.setOption('tablesHeaderId', true);
  Showdown.setOption('tasklists', true);
  var converter = new Showdown.Converter({ extensions: [ShowdownToc({ toc })] }),
    text = context,
    html = converter.makeHtml(text);

  // 获取博客的目录
  let markdownNavgation = []; //博客的目录
  function handleParsed(event) {
    let headTokens = event; //markdown中的heading
    let flag;
    let j = 0;
    for (let i = 0; i < headTokens.length; i++) {
      if (i == 0) {
        markdownNavgation.push([headTokens[i], []]);
        flag = headTokens[i];
      } else {
        /*
      获取heading的目录的逻辑（目前就获取两级目录）
      flag为当前heading
        1、下一个heading的depth=上一个heading的depth+1的话，则加入到子目录
        2、下一个heading的depth<上一个heading的depth的话，则flag卯向该heading
        3、下一个heading的depth>上一个heading的depth+1的话，则不加入到子目录（超过二级目录）
      */
        if (headTokens[i].level == flag.level + 1) {
          markdownNavgation[j][1].push(headTokens[i]);
        } else if (headTokens[i].level <= flag.level) {
          markdownNavgation.push([headTokens[i], []]);
          flag = headTokens[i];
          j++;
        } else {
          continue;
        }
      }
    }
  }
  function splitString(info) {
    if (info && info.length >= 15) {
      info = info.slice(0, 15);
      info = info + '...';
    }
    return info;
  }
  handleParsed(toc);

  // 代码高亮
  $: codetheme;
  hljs.registerLanguage('shell', shell);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('python', python);
  $: if (html) {
    afterUpdate(() => {
      if (document !== undefined) {
        hljs.highlightAll();
      }
    });
  }

  // 面包屑导航栏
  let breadcrumbInfo;
  if ($page.url.search) {
    breadcrumbInfo = [
      { name: 'Home', url: '/' },
      { name: 'Last Category', url: `/Blog/category-${$page.url.search.slice(1)}` },
      { name: 'Current Blog', url: '' },
    ];
  } else {
    breadcrumbInfo = [
      { name: 'Home', url: '/' },
      { name: 'Blogs', url: '/Blog/' },
      { name: 'Current Blog', url: '' },
    ];
  }
</script>

<svelte:head>
  {@html codetheme}
</svelte:head>

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 py-2">
    <div class="xl:pl-[19.5rem] overflow-hidden">
      <div
        class="max-w-xl mx-auto xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16 relative pt-8 mb-16">
        <!-- 文章头部 -->
        <header>
          <h1
            class="font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl ">
            {blog.title}
          </h1>
          <div class="text-sm leading-6">
            <dl>
              <dt class="sr-only">Date</dt>
              <dd class="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
                <time datetime="2022-05-27T15:00:00.000Z"
                  ><p class="font-body">{blog.publishedTime} • {blog.readTime} min read</p></time>
              </dd>
            </dl>
          </div>
          <div class="mt-6">
            <ul class="flex flex-nowrap text-sm leading-6 -mt-6 -mx-5">
              <li class="flex items-center font-medium whitespace-nowrap px-5 mt-4">
                <img
                  src={blog.authorAvatar}
                  alt=""
                  class="mr-3 w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800  shadow-xl" />
                <div class="text-sm leading-4">
                  <div class="text-slate-900 dark:text-slate-200 font-body">{blog.author}</div>
                  <div class="mt-1">
                    <a
                      href={blog.authorLink}
                      class="text-sky-500 hover:text-sky-600 dark:text-sky-400 font-body"
                      >@{blog.authorLinkName}</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </header>
        <!-- 文章内容 -->
        <div
          class="prose prose-slate mt-12 dark:prose-invert font-article 
          prose-p:mb-0 prose-p:mt-0 
          prose-a:text-blue-600 hover:prose-a:text-blue-500 
          prose-strong:text-orange-400
           prose-code:rounded-md  prose-code:bg-gray-300 dark:prose-code:bg-gray-700
           prose-pre:mb-2 prose-pre:p-0 prose-pre:mt-2 prose-pre:bg-inherit
           prose-hr:mb-2
           prose-h3:mb-1
           prose-img:rounded-md prose-img:mb-2 prose-img:mt-2">
          {@html html}
        </div>
        <!-- 文章右侧目录 -->
        <div
          class=" fixed z-20 top-[12.8125rem] bottom-4 h-96 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
          <ul class="text-slate-700 text-sm leading-6 font-body">
            <h3
              class="font-body font-bold text-lg mb-4 underline underline-offset-2 decoration-orange-400">
              目录
            </h3>
            {#each markdownNavgation as info}
              <!--一级目录 -->
              <li>
                <a
                  class="font-article block py-1 sm:text-sm lg:text-md font-medium hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
                  href="#{info[0].anchor}">
                  {splitString(info[0].text)}
                </a>
              </li>
              {#if info[1].length != 0}
                <!--二级目录 -->
                {#each info[1] as tempInfo}
                  <li class="ml-4">
                    <a
                      href="#{tempInfo.anchor}"
                      class="font-article group flex items-start sm:text-sm lg:text-md py-1 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
                      ><svg
                        width="3"
                        height="20"
                        viewBox="0 -9 3 24"
                        class="mr-2 text-slate-400 overflow-visible group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-blue-500"
                        ><path
                          d="M0 0L3 3L0 6"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round" /></svg
                      ><relin-hc>
                        <relin-origin>{splitString(tempInfo.text)}</relin-origin>
                      </relin-hc></a>
                  </li>
                {/each}
              {/if}
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
  <BackToTop />
</section>
