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
  var synthesis = window.speechSynthesis; //web speech api
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
  let englishWordDataNumber = blog.englishWordData.length;
  function handleHidden(word, flag, i) {
    synthesis.speak(new SpeechSynthesisUtterance(word));
    if (flag == 0) {
      blog.englishWordData[i].show = true;
      allFinishedNumber += 1;
    } else {
      blog.englishWordData[i].show = false;
      allFinishedNumber -= 1;
    }
  }

  //控制声音
  function handleSpeak(word) {
    synthesis.speak(new SpeechSynthesisUtterance(word));
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

  let levelFlag = -1;
  let underlineColor = 'decoration-orange-300'; //标题下划线颜色
  let wordTitle = '涉及词汇';
  let useWordNumber = englishWordDataNumber;
  // 重置所有的单词等级
  function handleReset() {
    blog.englishWordData.map((item) => {
      item.show = false;
      allFinishedNumber = 0;
      item.level = 0;
    });
    underlineColor = 'decoration-orange-300';
    levelFlag = 0;
    wordTitle = '涉及词汇';
    useWordNumber = englishWordDataNumber;
  }
  // 按等级排列
  function handleLevel(levelNum) {
    useWordNumber = 0;
    blog.englishWordData.map((item) => {
      if (item.level === levelNum) {
        useWordNumber += 1;
      }
    });
    if (levelNum == 0) {
      wordTitle = '未分类词汇';
      underlineColor = 'decoration-orange-300';
    } else if (levelNum == 1) {
      wordTitle = '简单词汇';
      underlineColor = 'decoration-green-300';
    } else if (levelNum == 2) {
      wordTitle = '中等词汇';
      underlineColor = 'decoration-sky-300';
    } else if (levelNum == 3) {
      wordTitle = '困难词汇';
      underlineColor = 'decoration-indigo-300';
    }
    levelFlag = levelNum;
  }
  // 改变等级
  function changeLevel(levelNum, i) {
    blog.englishWordData[i].show = true;
    blog.englishWordData[i].level = levelNum;
  }
</script>

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 py-2">
    <div class="xl:pl-[22.5rem] overflow-hidden">
      <div class="max-w-xl mx-auto xl:max-w-none  relative pt-8 mb-16">
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
           prose-pre:mb-2  prose-pre:mt-2 prose-pre:max-h-40 sm:prose-pre:max-h-48 dark:prose-pre:bg-gray-900 prose-pre:bg-gray-600 prose-pre:shadow-xl
           prose-hr:mb-2
           prose-headings:text-slate-900 prose-headings:dark:text-slate-200 prose-headings:mb-2
           prose-p:text-slate-900 prose-p:dark:text-slate-200
           prose-img:rounded-md prose-img:mb-2 prose-img:mt-2">
          <!-- 自己写的内容 -->
          <div>{@html html}</div>
          <h3 class="text-center">{wordTitle}({useWordNumber})</h3>
          <hr />
          <div class="flex place-content-center gap-4 mb-4">
            <button
              class="btn btn-xs sm:btn-sm bg-orange-300 dark:bg-orange-400 hover:bg-orange-500 font-article border-none"
              on:click={() => {
                handleLevel(0);
              }}><p>未分类</p></button>
            <button
              class="btn btn-xs sm:btn-sm bg-green-300 dark:bg-green-400 hover:bg-green-500 font-article border-none"
              on:click={() => {
                handleLevel(1);
              }}><p>简单</p></button>
            <button
              class="btn btn-xs sm:btn-sm bg-sky-300 dark:bg-sky-400  hover:bg-sky-500 font-article border-none"
              on:click={() => {
                handleLevel(2);
              }}><p>中等</p></button>
            <button
              class="btn btn-xs sm:btn-sm bg-indigo-300 dark:bg-indigo-400  hover:bg-indigo-500 font-article border-none"
              on:click={() => {
                handleLevel(3);
              }}><p>困难</p></button>
            <button
              class="btn btn-xs sm:btn-sm bg-red-300 dark:bg-red-400  hover:bg-red-500 font-article border-none"
              on:click={handleReset}><p>重置</p></button>
          </div>

          <!-- 数据里面的内容 -->
          <div>
            {#each blog.englishWordData as data, i}
              {#if data.level == levelFlag}
                <div
                  out:fade
                  class="bg-slate-100 dark:bg-slate-700 rounded-xl p-2 mb-6 shadow-md shadow-gray-300 dark:shadow-gray-800">
                  <!-- headWord -->
                  <div class="flex mt-2 place-items-end mb-4 ml-2 gap-3">
                    <p
                      class="not-prose underline underline-offset-4 {underlineColor} decoration-4 text-lg font-bold">
                      {data.headWord}
                    </p>
                    <input
                      type="checkbox"
                      bind:checked={data.show}
                      on:click={() => {
                        handleHidden(data.headWord, data.show, i);
                      }}
                      class="mb-1 w-4 h-4" />
                    {#if data.show}
                      <span
                        transition:fade
                        class="mb-1 text-xs font-article font-thin text-gray-400"
                        >已掌握 {allFinishedNumber}/{englishWordDataNumber}</span>
                    {/if}
                  </div>

                  {#if data.show}
                    <!-- speak -->
                    <div class="flex mb-1 place-items-center ml-2">
                      <svg
                        t="1655481586518"
                        on:click={handleSpeak(data.headWord)}
                        class=" fill-gray-400 hover:fill-orange-500 mr-2"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3202"
                        width="20"
                        height="20"
                        ><path
                          d="M640 181.333333c0-46.037333-54.357333-70.4-88.746667-39.850666L359.552 311.850667a32 32 0 0 1-21.248 8.106666H181.333333A96 96 0 0 0 85.333333 415.957333v191.872a96 96 0 0 0 96 96h157.013334a32 32 0 0 1 21.248 8.106667l191.616 170.410667c34.389333 30.549333 88.789333 6.144 88.789333-39.850667V181.333333zM402.133333 359.68L576 205.098667v613.632l-173.866667-154.624a96 96 0 0 0-63.786666-24.277334H181.333333a32 32 0 0 1-32-32V416a32 32 0 0 1 32-32h157.013334a96 96 0 0 0 63.786666-24.277333z"
                          p-id="3203" /><path
                          d="M810.325333 251.605333a32 32 0 0 1 44.757334 6.698667A424.917333 424.917333 0 0 1 938.666667 512a424.96 424.96 0 0 1-83.626667 253.696 32 32 0 0 1-51.413333-38.058667A360.917333 360.917333 0 0 0 874.666667 512a360.917333 360.917333 0 0 0-71.04-215.637333 32 32 0 0 1 6.698666-44.757334z"
                          p-id="3204" /><path
                          d="M731.434667 357.12a32 32 0 0 1 43.392 12.885333c22.869333 42.24 35.84 90.666667 35.84 141.994667a297.514667 297.514667 0 0 1-35.84 141.994667 32 32 0 0 1-56.32-30.464c17.92-33.152 28.16-71.082667 28.16-111.530667s-10.24-78.378667-28.16-111.530667a32 32 0 0 1 12.928-43.392z"
                          p-id="3205" /></svg>
                      <!-- 音标 -->
                      {#if data.voice}
                        <span class="not-prose text-sm font-article font-thin text-gray-500"
                          >/ {data.voice} /</span>
                      {/if}
                    </div>
                    <!-- headTrans -->
                    {#each data.headTrans as headTran}
                      <p class="ml-2"><strong>{headTran.pos}</strong>. {headTran.trans}</p>
                    {/each}
                    <!-- example -->
                    {#if data.example.length > 0}
                      <pre>{#each data.example as example}<code
                            >{example.sentence}<br />{example.trans}<br /></code
                          >{/each}</pre>
                    {/if}
                    {#if data.phrase.length > 0}
                      <!-- phrase -->
                      <pre>{#each data.phrase as phrase}<code
                            >{phrase.name} {phrase.trans}<br /></code
                          >{/each}</pre>
                    {/if}
                    <!-- button -->
                    <div class="flex place-content-center gap-4">
                      <button
                        disabled={levelFlag == 1}
                        class="btn btn-xs bg-green-300 dark:bg-green-400 hover:bg-green-500 font-article border-none"
                        on:click={() => {
                          changeLevel(1, i);
                        }}><p>简单</p></button>
                      <button
                        disabled={levelFlag == 2}
                        class="btn btn-xs bg-sky-300 dark:bg-sky-400  hover:bg-sky-500 font-article border-none"
                        on:click={() => {
                          changeLevel(2, i);
                        }}><p>中等</p></button>
                      <button
                        disabled={levelFlag == 3}
                        class="btn btn-xs bg-indigo-300 dark:bg-indigo-400  hover:bg-indigo-500 font-article border-none"
                        on:click={() => {
                          changeLevel(3, i);
                        }}><p>困难</p></button>
                    </div>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
          <!-- 学完后的打卡 -->
          <div
            class="not-prose p-4 mt-4 sm:mr-4 font-body bg-gray-300 dark:bg-gray-800 rounded-xl dark:text-white">
            {#if allFinishedNumber == englishWordDataNumber}
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
                  >{englishWordDataNumber - allFinishedNumber}</span
                >个单词未掌握，快去学习吧！🏋️‍♀️
              </p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  <BackToTop />
</section>
