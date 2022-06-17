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
  import { fade } from 'svelte/transition';
  export let blog;

  // 解析strapi得到的博客内容为html
  const context = blog.context; //博客的内容
  Showdown.setOption('tables', true);
  Showdown.setOption('tablesHeaderId', true);
  Showdown.setOption('tasklists', true);
  var converter = new Showdown.Converter(),
    text = context,
    html = converter.makeHtml(text);

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

  //控制是否隐藏
  $: allFinishedNumber = 0;
  function handleHidden(flag, i) {
    if (flag === 'hidden') {
      blog.englishWordData[i].isHidden = '';
      allFinishedNumber += 1;
    } else {
      blog.englishWordData[i].isHidden = 'hidden';
      allFinishedNumber -= 1;
    }
  }

  //获取当前时间
  function getDate() {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate() +
      ' ' +
      today.getHours() +
      ':' +
      today.getMinutes() +
      ':' +
      today.getSeconds();
    return date;
  }
</script>

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
                  class="mr-3 w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800" />
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
           prose-code:rounded-md  
           prose-pre:mb-2  prose-pre:mt-2 prose-pre:max-h-36 sm:prose-pre:max-h-48 
           prose-hr:mb-2
           prose-headings:text-slate-900 prose-headings:dark:text-slate-200 prose-headings:mb-1
           prose-p:text-slate-900 prose-p:dark:text-slate-200
           prose-img:rounded-md prose-img:mb-2 prose-img:mt-2">
          <!-- 自己写的内容 -->
          <div>{@html html}</div>
          <!-- 数据里面的内容 -->
          <div>
            {#each blog.englishWordData as data, i}
              <!-- headWord -->
              <h3>
                {data.headWord}
                <label>
                  <input type="checkbox" class="ml-2" on:click={handleHidden(data.isHidden, i)} />
                </label>
                {#if data.isHidden != 'hidden'}
                  <span transition:fade class="ml-2 text-xs font-article font-thin text-gray-400 "
                    >已掌握</span>
                {/if}
              </h3>
              <hr />
              {#if data.isHidden != 'hidden'}
                <div transition:fade>
                  <!-- headTrans -->
                  {#each data.headTrans as headTran}
                    <p><strong>{headTran.pos}</strong>. {headTran.trans}</p>
                  {/each}
                  <!-- example -->
                  {#if data.example.length > 0}
                    <pre>{#each data.example as example}<code
                          >{example.sentence}<br />{example.trans}<br /></code
                        >{/each}</pre>
                  {/if}
                  {#if data.phrase.length > 0}
                    <!-- phrase -->
                    <pre>{#each data.phrase as phrase}<code>{phrase.name} {phrase.trans}<br /></code
                        >{/each}</pre>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        </div>
        <!-- 学完后的打卡 -->
        <div
          class="p-4 mt-4 sm:mr-4 font-body bg-gray-300 dark:bg-gray-800 rounded-xl dark:text-white">
          {#if allFinishedNumber == blog.englishWordData.length}
            <p class="text-md mb-2 font-bold">今日英语单词打卡已完成👍</p>
            <p class="text-sm mb-2 font-thin underline underline-offset-2 decoration-yellow-400">
              打卡时间：{getDate()}
            </p>
            <p class="text-sm mb-2 font-thin underline underline-offset-2 decoration-orange-400">
              打卡人：{blog.author}
            </p>
            <p class="text-sm font-thin underline underline-offset-2 decoration-green-400">
              掌握单词：{allFinishedNumber}
            </p>
          {:else}
            <p class="text-center">
              还有<span class="font-body text-red-500 font-bold "
                >{blog.englishWordData.length - allFinishedNumber}</span
              >个单词未掌握，快去学习吧！🏋️‍♀️
            </p>
          {/if}
        </div>
      </div>
    </div>
  </div>
  <BackToTop />
</section>
