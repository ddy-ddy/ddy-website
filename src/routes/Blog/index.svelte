<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/api/blog/blog.json');
    const blogs = await res.json();
    return {
      props: {
        blogs,
      },
    };
  }
</script>

<script>
  import Breadcrumb from '$lib/component/breadCrumb.svelte';
  import PageDescription from '$lib/component/pageDescription.svelte';
  let pageInfo = {
    title: 'All Blogs',
    desciption: 'All the latest Blogs, straight by ddy.',
  };
  export let blogs;
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '' },
  ];
</script>

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <main class="max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
    <PageDescription title={pageInfo.title} desciption={pageInfo.desciption} />
    <div
      class="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
      <div
        class="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block" />
      <div class="space-y-16">
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
            <a
              class="flex items-center text-sm text-sky-500 font-medium"
              href={`/Blog/blog-${blog.id}`}
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
      </div>
    </div>
  </main>
</section>
