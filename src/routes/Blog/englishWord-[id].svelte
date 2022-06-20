<script context="module">
  export async function load({ params, fetch }) {
    const id = params.id;
    const res = await fetch(`/api/blog/blog-${id}.json`);
    const blog = await res.json();
    return {
      props: {
        blog,
        englishWordData: blog.attributes.englishWord.data.attributes.englishWordData,
      },
    };
  }
</script>

<script>
  import { BASE_URL } from '$lib/variables.js';
  import { page } from '$app/stores';
  import Breadcrumb from '$lib/component/contentLayout/breadCrumb.svelte';
  import BackToTop from '$lib/component/utility/backToTop.svelte';
  import Showdown from 'showdown';
  import { fade } from 'svelte/transition';
  export let blog;
  export let englishWordData;

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

  //控制是否隐藏
  let allFinishedNumber = 0;
  let englishWordDataNumber = englishWordData.length;
  function handleHidden(word, show, tempData) {
    synthesis.speak(new SpeechSynthesisUtterance(word));
    if (show == 0) {
      tempData.show = true;
      allFinishedNumber += 1;
    } else {
      tempData.show = false;
      allFinishedNumber -= 1;
    }
  }

  // 将原始数据按照级别进行划分
  let levelWordData = Array.from(Array(4), () => new Array());
  englishWordData.map((item) => {
    switch (item.level) {
      case 0:
        item.show ? (allFinishedNumber += 1) : 1;
        levelWordData[0].push(item);
        break;
      case 1:
        item.show ? (allFinishedNumber += 1) : 1;
        levelWordData[1].push(item);
        break;
      case 2:
        item.show ? (allFinishedNumber += 1) : 1;
        levelWordData[2].push(item);
        break;
      case 3:
        item.show ? (allFinishedNumber += 1) : 1;
        levelWordData[3].push(item);
        break;
      default:
        item.show ? (allFinishedNumber += 1) : 1;
        levelWordData[0].push(item);
        break;
    }
  });

  let nowData = levelWordData[0]; //当前使用的数据
  let levelFlag = -1;
  let textColor = 'text-orange-300';
  let fillColor = 'fill-orange-300';
  let underlineColor = 'decoration-orange-300'; //标题下划线颜色
  let wordTitle = '涉及词汇';
  let resetInfo = '';
  $: length_0 = levelWordData[0].length;
  $: length_1 = levelWordData[1].length;
  $: length_2 = levelWordData[2].length;
  $: length_3 = levelWordData[3].length;

  // 重置所有的单词的分类情况
  function handleResetLevel() {
    levelWordData = [[], [], [], []];
    englishWordData.map((item) => {
      item.show = 0;
      item.level = 1;
      levelWordData[0].push(item);
    });
    nowData = levelWordData[0];
    allFinishedNumber = 0;
    textColor = 'text-orange-300';
    fillColor = 'fill-orange-300';
    underlineColor = 'decoration-orange-300';
    levelFlag = 0;
    wordTitle = '涉及词汇';
    resetInfo = '';
  }

  // 重置所有的单词掌握情况
  function handleResetWord() {
    englishWordData.map((item) => {
      item.show = 0;
    });
    nowData = nowData;
    allFinishedNumber = 0;
    resetInfo = '';
  }

  // 保存设置
  async function saveReset() {
    const res = await fetch(
      BASE_URL + '/english-word-data-jsons/' + blog.attributes.englishWord.data.id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          data: {
            englishWordData: englishWordData,
          },
        }),
      },
    );
    if (!res.ok) {
      resetInfo = '保存失败';
    } else {
      resetInfo = '保存成功';
    }
  }

  // 按等级排列
  function handleLevel(levelNum) {
    nowData = levelWordData[levelNum];
    if (levelNum == 0) {
      wordTitle = '未分类词汇';
      textColor = 'text-orange-300';
      fillColor = 'fill-orange-300';
      underlineColor = 'decoration-orange-300';
    } else if (levelNum == 1) {
      wordTitle = '简单词汇';
      textColor = 'text-green-300';
      fillColor = 'fill-green-300';
      underlineColor = 'decoration-green-300';
    } else if (levelNum == 2) {
      wordTitle = '中等词汇';
      textColor = 'text-sky-300';
      fillColor = 'fill-sky-300';
      underlineColor = 'decoration-sky-300';
    } else if (levelNum == 3) {
      wordTitle = '困难词汇';
      textColor = 'text-indigo-300';
      fillColor = 'fill-indigo-300';
      underlineColor = 'decoration-indigo-300';
    }
    levelFlag = levelNum;
  }
  // 改变等级
  function changeLevel(changeLevel, dataIndex, tempData) {
    tempData.level = changeLevel; //修改数据的level信息
    tempData.show = true; //修改数据的show信息
    //添加到改变的级别数据中
    let newData = tempData;
    levelWordData[changeLevel].push(newData);
    //移除当前级别数据
    levelWordData[levelFlag].splice(dataIndex, 1);
    nowData = levelWordData[levelFlag];
    levelWordData = levelWordData;
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
          prose-strong:text-indigo-400 dark:prose-strong:text-indigo-500
           prose-code:rounded-md  
           prose-pre:mb-2  prose-pre:mt-2 dark:prose-pre:bg-gray-900 prose-pre:bg-gray-600 prose-pre:shadow-xl
           prose-hr:mb-2
           prose-headings:text-slate-900 prose-headings:dark:text-slate-200 prose-headings:mb-2
           prose-p:text-slate-900 prose-p:dark:text-slate-200
           prose-img:rounded-md prose-img:mb-2 prose-img:mt-2">
          <!-- 自己写的内容 -->
          <div>{@html html}</div>

          <h3 class="text-center">{wordTitle}</h3>
          <hr />
          <div class="flex flex-wrap place-content-center gap-4 mb-4">
            <!-- 重置分类等级 -->
            <button
              class="btn btn-xs sm:btn-sm bg-purple-300 dark:bg-purple-400 hover:bg-purple-500 font-article border-none"
              on:click={() => {
                resetInfo = '确定要重置目前的单词等级分类吗？';
              }}><p>重置单词分级</p></button>
            <!-- 重置掌握单词 -->
            <button
              class="btn btn-xs sm:btn-sm bg-purple-300 dark:bg-purple-400 hover:bg-purple-500 font-article border-none"
              on:click={() => {
                resetInfo = '确定要重置目前掌握的单词吗?';
              }}><p>重置掌握单词</p></button>
            <!-- 保存记录 -->
            <button
              class="btn btn-xs sm:btn-sm bg-purple-300 dark:bg-purple-400 hover:bg-purple-500 font-article border-none"
              on:click={saveReset}><p>保存</p></button>
          </div>
          {#if resetInfo}
            <div class="alert rounded-xl shadow-md mb-4 dark:bg-gray-800">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="stroke-info flex-shrink-0 w-6 h-6"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{resetInfo}</span>
              </div>
              <div class="flex-none">
                {#if resetInfo === '保存成功' || resetInfo === '保存失败'}
                  <button
                    on:click={() => {
                      resetInfo = '';
                    }}
                    class="btn btn-sm bg-purple-300 dark:bg-purple-400 hover:bg-purple-500  border-none"
                    >了解</button>
                {:else}
                  <button
                    on:click={() => {
                      if (resetInfo === '确定要重置目前掌握的单词吗?') {
                        handleResetWord();
                      } else {
                        handleResetLevel();
                      }
                    }}
                    class="btn btn-sm btn-ghost">确定</button>
                  <button
                    on:click={() => {
                      resetInfo = '';
                    }}
                    class="btn btn-sm bg-purple-300 dark:bg-purple-400 hover:bg-purple-500  border-none"
                    >拒绝</button>
                {/if}
              </div>
            </div>
          {/if}
          <div class="flex flex-wrap place-content-center gap-4 mb-4">
            <button
              class="btn btn-xs sm:btn-sm bg-orange-300 dark:bg-orange-400 hover:bg-orange-500 font-article border-none"
              on:click={() => {
                handleLevel(0);
              }}><p>未分类({length_0})</p></button>
            <button
              class="btn btn-xs sm:btn-sm bg-green-300 dark:bg-green-400 hover:bg-green-500 font-article border-none"
              on:click={() => {
                handleLevel(1);
              }}><p>简单({length_1})</p></button>
            <button
              class="btn btn-xs sm:btn-sm bg-sky-300 dark:bg-sky-400  hover:bg-sky-500 font-article border-none"
              on:click={() => {
                handleLevel(2);
              }}><p>中等({length_2})</p></button>
            <button
              class="btn btn-xs sm:btn-sm bg-indigo-300 dark:bg-indigo-400  hover:bg-indigo-500 font-article border-none"
              on:click={() => {
                handleLevel(3);
              }}><p>困难({length_3})</p></button>
          </div>

          <!-- 数据里面的内容 -->
          {#if levelFlag != -1}
            {#each nowData as data, i}
              <div
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
                      handleHidden(data.headWord, data.show, data);
                    }}
                    class="mb-1 w-4 h-4" />
                  {#if data.show}
                    <span transition:fade class="mb-1 text-xs font-article font-thin text-gray-400"
                      >已掌握 {allFinishedNumber}/{englishWordDataNumber}</span>
                  {/if}
                </div>

                {#if data.show}
                  <!-- speak -->
                  <div class="flex mb-1 place-items-center ml-2">
                    <svg
                      t="1655481586518"
                      on:click={handleSpeak(data.headWord)}
                      class=" fill-gray-300 {fillColor} mr-2"
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
                    <p class="ml-2">
                      <span class="{textColor} font-article font-bold"
                        >{headTran.pos}.
                      </span>{headTran.trans}
                    </p>
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
                  <!-- button -->
                  <div class="flex place-content-center gap-4">
                    <button
                      disabled={levelFlag == 1}
                      class="btn btn-xs bg-green-300 dark:bg-green-400 hover:bg-green-500 font-article border-none"
                      on:click={() => {
                        changeLevel(1, i, data);
                      }}><p>简单</p></button>
                    <button
                      disabled={levelFlag == 2}
                      class="btn btn-xs bg-sky-300 dark:bg-sky-400  hover:bg-sky-500 font-article border-none"
                      on:click={() => {
                        changeLevel(2, i, data);
                      }}><p>中等</p></button>
                    <button
                      disabled={levelFlag == 3}
                      class="btn btn-xs bg-indigo-300 dark:bg-indigo-400  hover:bg-indigo-500 font-article border-none"
                      on:click={() => {
                        changeLevel(3, i, data);
                      }}><p>困难</p></button>
                  </div>
                {/if}
              </div>
            {/each}
          {/if}

          <!-- 学完后的打卡 -->
          <div
            class="not-prose shadow-md p-4 mt-4 font-body bg-gray-100 dark:bg-gray-800 rounded-xl dark:text-white">
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
