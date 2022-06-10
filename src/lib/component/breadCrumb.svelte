<!-- 
  页面左上角的面包屑导航
 -->
<script>
  export let info = [];
</script>

<div class="py-4 px-4">
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <!-- home -->
      <li class="inline-flex items-center">
        <a
          href="/"
          class="font-body inline-flex items-center text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          <svg
            class="mr-2 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
          Home
        </a>
      </li>
      <!-- 中间的 -->
      {#if info.length > 2}
        {#each info.slice(1, info.length - 1) as tempInfo}
          <li>
            <div class="flex items-center">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" /></svg>
              <a
                href={tempInfo.url}
                class="font-body ml-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >{tempInfo.name}</a>
            </div>
          </li>
        {/each}
      {/if}

      {#if info.length > 1}
        <!-- 结尾的 -->
        <li aria-current="page">
          <div class="flex items-center">
            <svg
              class="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd" /></svg>
            <span
              class="font-body ml-1 text-xs sm:text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500"
              >{info.pop().name}</span>
          </div>
        </li>
      {/if}
    </ol>
  </nav>
</div>
