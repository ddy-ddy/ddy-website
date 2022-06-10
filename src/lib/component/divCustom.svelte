<!-- 
  div页面的总体布局
  1、照片内容整理布局
  2、照片带有瀑布式的布局
  3、照片带有grid的布局
  4、博客带有grid的布局
-->
<script>
  export let withGlobalDiv = false;
  export let withGrid = false;
  export let withWaterfall = false;
  export let withGridBlog = false;
  export let mt = 'mt-2';
</script>

<!-- 照片内容整体布局 -->
{#if withGlobalDiv}
  <div class="max-w-screen-xl mx-auto px-8 py-1 sm:px-6 lg:px-8">
    <slot />
  </div>
  <!-- 照片带有瀑布式的布局 -->
{:else if withWaterfall}
  <div class="{mt} columns-2 sm:columns-4 md:columns-5 gap-2 space-y-6 ">
    <slot />
  </div>
  <!-- 照片带有grid的布局 -->
{:else if withGrid}
  <div class="{mt} grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <slot />
  </div>
  <!-- 博客带有grid的布局 -->
{:else if withGridBlog}
  <div class="{mt} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
    <slot />
  </div>
{/if}
