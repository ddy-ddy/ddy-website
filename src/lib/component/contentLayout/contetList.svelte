<!-- 
    时间线页面布局时内容的展示
 -->
<script>
  export let projects = false;
  export let blogs = false;
  export let categories = false;
  export let searchFlag = false;
  function handleBlogTheme(content) {
    let addFlag = searchFlag ? '?1' : '';
    if (content.blogTheme === 'blog') {
      return `/Blog/blog-${content.id}${addFlag}`;
    } else if (content.blogTheme === 'englishWord') {
      return `/Blog/englishWord-${content.id}${addFlag}`;
    }
  }
</script>

<!-- Project page -->
{#if projects}
  {#each projects as project}
    <article class="relative group">
      <div
        class="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-200 dark:group-hover:bg-slate-800/50" />
      <svg
        viewBox="0 0 9 9"
        class="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
        ><circle
          cx="4.5"
          cy="4.5"
          r="4.5"
          stroke="currentColor"
          class="fill-white dark:fill-slate-900"
          stroke-width="2" /></svg>
      <div class="relative">
        <h2
          class="text-base underline underline-offset-4 decoration-pink-500 font-display font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-8 lg:pt-0">
          {project.title}
        </h2>
        <div
          class="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2 dark:text-slate-400">
          <p class="font-body">
            {project.description}
          </p>
        </div>
        <dl class="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
          <dt class="sr-only">Date</dt>
          <dd class="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
            <time datetime="2022-05-27T15:00:00.000Z"
              ><p class="font-body">{project.publishedTime}</p>
            </time>
          </dd>
        </dl>
      </div>
      <div class="flex flex-row gap-6">
        {#if project.isOnline == true}
          <a
            class="flex items-center text-sm text-sky-500 font-medium hover:text-sky-300"
            href={project.webLink}
            target="_blank">
            <span class="relative"><p class="font-body">Website</p></span>
          </a>
        {/if}
        <a class="flex items-center" href={project.githubLink} target="_blank">
          <span class="relative">
            <svg
              t="1652012821910"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2853"
              width="20"
              height="20"
              ><path
                d="M512 0C229.283787 0 0.142041 234.942803 0.142041 524.867683c0 231.829001 146.647305 428.553077 350.068189 497.952484 25.592898 4.819996 34.976961-11.38884 34.976961-25.294314 0-12.45521-0.469203-45.470049-0.725133-89.276559-142.381822 31.735193-172.453477-70.380469-172.453477-70.380469-23.246882-60.569859-56.816233-76.693384-56.816234-76.693385-46.493765-32.58829 3.540351-31.948468 3.540351-31.948467 51.356415 3.71097 78.356923 54.086324 78.356923 54.086324 45.683323 80.19108 119.817417 57.072162 148.993321 43.593236 4.649376-33.91059 17.915029-57.029508 32.50298-70.167195-113.675122-13.222997-233.151301-58.223843-233.1513-259.341366 0-57.285437 19.919806-104.163095 52.678715-140.846248-5.246544-13.265652-22.820334-66.626844 4.990615-138.884127 0 0 42.996069-14.076094 140.760939 53.787741 40.863327-11.644769 84.627183-17.445825 128.177764-17.6591 43.465272 0.213274 87.271782 6.014331 128.135109 17.6591 97.679561-67.906489 140.59032-53.787741 140.59032-53.787741 27.938914 72.257282 10.407779 125.618474 5.118579 138.884127 32.844219 36.683154 52.593405 83.560812 52.593405 140.846248 0 201.586726-119.646798 245.990404-233.663158 258.957473 18.341577 16.208835 34.721032 48.199958 34.721032 97.210357 0 70.167195-0.639822 126.7275-0.639823 143.960051 0 14.033439 9.213443 30.370239 35.190235 25.209005 203.250265-69.527373 349.769606-266.123484 349.769605-497.867175C1023.857959 234.942803 794.673558 0 512 0"
                fill="#3E75C3"
                p-id="2854" /></svg
            ></span>
        </a>
      </div>
    </article>
  {/each}

  <!-- all blog page and specific blog category page -->
{:else if blogs}
  {#each blogs as blog}
    <article class="relative group">
      <div
        class="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-200 dark:group-hover:bg-slate-800/50" />
      <svg
        viewBox="0 0 9 9"
        class="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
        ><circle
          cx="4.5"
          cy="4.5"
          r="4.5"
          stroke="currentColor"
          class="fill-white dark:fill-slate-900"
          stroke-width="2" /></svg>
      <div class="relative">
        <h3
          class="text-base underline underline-offset-4 decoration-indigo-500 font-display font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-8 lg:pt-0">
          {blog.title}
        </h3>
        <div
          class="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2 dark:text-slate-400">
          <p class="font-body">
            {blog.description}
          </p>
        </div>
        <dl class="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
          <dt class="sr-only">Date</dt>
          <dd class="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
            <time datetime="2022-05-27T15:00:00.000Z"
              ><p class="font-body">{blog.publishedTime}</p></time>
          </dd>
        </dl>
      </div>
      <a class="flex items-center text-sm text-sky-500 font-medium" href={handleBlogTheme(blog)}
        ><span class="relative"><p class="font-body">Read more</p></span><svg
          class="relative mt-px overflow-visible ml-2.5 text-sky-300 dark:text-sky-700"
          width="3"
          height="6"
          viewBox="0 0 3 6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><path d="M0 0L3 3L0 6" /></svg
        ></a>
    </article>
  {/each}

  <!-- all blog categories page -->
{:else if categories}
  {#each categories as category}
    <article class="relative group">
      <div
        class="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-200 dark:group-hover:bg-slate-800/50" />
      <svg
        viewBox="0 0 9 9"
        class="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
        ><circle
          cx="4.5"
          cy="4.5"
          r="4.5"
          stroke="currentColor"
          class="fill-white dark:fill-slate-900"
          stroke-width="2" /></svg>
      <div class="relative">
        <h3
          class="text-base underline underline-offset-4 decoration-indigo-500 font-display font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-8 lg:pt-0">
          {category.title} ({category.blogNumber})
        </h3>
        <div
          class="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2 dark:text-slate-400">
          <p class="font-body">
            {category.description}
          </p>
        </div>
      </div>
      <a
        class="flex items-center text-sm text-sky-500 font-medium"
        href="/Blog/category-{category.id}"
        ><span class="relative"><p class="font-body">查看相关博客</p></span><svg
          class="relative mt-px overflow-visible ml-2.5 text-sky-300 dark:text-sky-700"
          width="3"
          height="6"
          viewBox="0 0 3 6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><path d="M0 0L3 3L0 6" /></svg
        ></a>
    </article>
  {/each}
{/if}
