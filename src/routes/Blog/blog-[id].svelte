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
  import Breadcrumb from '$lib/component/breadCrumb.svelte';
  import Showdown from 'showdown';
  import ShowdownToc from 'showdown-toc';

  export let blog;
  const context = blog.context; //博客的内容
  const toc = []; //博客目录
  var converter = new Showdown.Converter({ extensions: [ShowdownToc({ toc })] }),
    text = context,
    html = converter.makeHtml(text);
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

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="xl:pl-[19.5rem] overflow-hidden">
      <div
        class=" max-w-xl mx-auto xl:max-w-none xl:ml-0 xl:mr-[15.5rem] xl:pr-16 relative pt-8 mb-16">
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
                  src="/img/author.jpg"
                  alt=""
                  class="mr-3 w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800" />
                <div class="text-sm leading-4">
                  <div class="text-slate-900 dark:text-slate-200 font-body">{blog.author}</div>
                  <div class="mt-1">
                    <a
                      href="https://github.com/ddy-ddy"
                      class="text-sky-500 hover:text-sky-600 dark:text-sky-400 font-body"
                      >@ddy-ddy</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </header>
        <!-- 文章内容 -->
        <div
          class="prose prose-slate mt-12 dark:prose-invert font-article prose-p:mb-0 prose-p:mt-0 prose-code:bg-indigo-400 prose-a:text-blue-600 hover:prose-a:text-blue-500">
          {@html html}
        </div>
        <!-- 文章右侧目录 -->
        <div
          class=" fixed z-20 top-[12.8125rem] bottom-4 h-96 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
          <ul class="text-slate-700 text-sm leading-6 font-body">
            {#each markdownNavgation as info, i}
              <!--一级目录 -->
              <li>
                <a
                  class="font-article block py-1 sm:text-sm lg:text-md font-medium hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
                  href="#{info[0].anchor}">
                  <input type="checkbox" />
                  {i+1}. {splitString(info[0].text)}
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
</section>
