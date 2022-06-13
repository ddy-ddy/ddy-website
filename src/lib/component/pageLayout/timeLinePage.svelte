<!-- 
    时间线的布局，用于Project page and Blog Page
 -->
<script>
  import PageDescription from '$lib/component/contentLayout/pageDescription.svelte';
  export let pageInfo; //页面基本信息
</script>

<main class="max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
  <PageDescription title={pageInfo.title} desciption={pageInfo.desciption} />
  <div
    class="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
    <div
      class="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block" />
    <div class="space-y-16">
      <slot />
    </div>
  </div>
</main>
