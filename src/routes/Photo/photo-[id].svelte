<script context="module">
  export async function load({ params, fetch }) {
    const id = params.id;
    const res = await fetch(`/api/photo/photo-${id}.json`);
    const photography = await res.json();
    return {
      props: {
        photography,
      },
    };
  }
</script>

<script>
  import { page } from '$app/stores';
  import Breadcrumb from '$lib/component/breadCrumb.svelte';
  export let photography;
  let breadcrumbInfo;
  if ($page.url.search) {
    breadcrumbInfo = [
      { name: 'Home', url: '/' },
      { name: 'Last Category', url: `/Photo/category-${$page.url.search.slice(1)}` },
      { name: 'Current Photo', url: '' },
    ];
  } else {
    breadcrumbInfo = [
      { name: 'Home', url: '/' },
      { name: 'Photos', url: '/Photo/' },
      { name: 'Current Photo', url: '' },
    ];
  }
</script>

<sction>
  <Breadcrumb info={breadcrumbInfo} />
  <div class="max-w-screen-md mx-auto px-8 py-1 sm:px-6 lg:px-8">
    <div class="relative overflow-hidden rounded-lg">
      <img class="inset-0 object-cover w-full h-full" src={photography.image} alt="photography" />
    </div>
    <div>
      <!-- 标题 -->
      {#if photography.title}
        <h2
          class="mt-4 text-xl sm:text-2xl font-bold font-display tracking-wider dark:text-gray-200">
          {photography.title}
        </h2>
      {/if}
      <!-- 发布时间 -->
      <ul class="list-disc list-inside">
        {#if photography.shootTime}
          <li
            class="mt-4 italic underline decoration-sky-500 font-light font-body antialiased dark:text-gray-200">
            🗓️发布时间：{photography.shootTime}
          </li>
        {/if}
        {#if photography.shootPlace}
          <li
            class="mt-2 italic underline decoration-orange-500 font-light font-body antialiased dark:text-gray-200">
            🏡拍摄地点：{photography.shootPlace}
          </li>
        {/if}
        {#if photography.camera}
          <li
            class="mt-2 italic underline decoration-green-500 font-light font-body antialiased dark:text-gray-200">
            📷拍摄设备：{photography.camera}
          </li>
        {/if}
        {#if photography.author}
          <li
            class="mt-2 italic underline decoration-green-500 font-light font-body antialiased dark:text-gray-200">
            💁摄影师：{photography.author}
          </li>
        {/if}
      </ul>
      {#if photography.description}
        <p
          class="mt-4 text-gray-600 font-bold font-body text-md sm:text-lg leading-normal dark:text-gray-300"
          style="text-indent: 20px;">
          {photography.description}
        </p>
      {/if}
    </div>
  </div>
</sction>
