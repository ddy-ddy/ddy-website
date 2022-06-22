<!-- 
  导航栏 
-->
<script>
  import { navTag } from '$lib/variables';
  //判断是否要下拉框
  let flag = ['Blog', 'Photo'];
  // 判断是否要search栏
  export let search = 'no';
  //判断是否切换深色模式
  let isDark = true;
  if (typeof localStorage !== 'undefined') {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      isDark = false;
    }
  }
  function toggleDarkMode() {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'dark';
      isDark = false;
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'light';
      isDark = true;
    }
  }
  //导航栏字体class
  let navClass =
    'font-body font-bold border-gray-100 hover:bg-gray-50 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
</script>

<header
  class="z-10 shadow-lg dark:shadow-3xl stick antialiased text-gray-700 dark:text-slate-400 bg-white dark:bg-slate-900">
  <div class="navbar">
    <!-- 左边导航 -->
    <div class="navbar-start px-2">
      <div class="dropdown">
        <!-- 导航栏头像 -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost btn-circle avatar online">
          <div class="w-10 rounded-full">
            <img src="/img/logo.svg" alt="logo" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-34 bg-slate-50 dark:bg-slate-800">
          {#each navTag as tag}
            {#if flag.includes(tag.name)}
              <li tabindex="0">
                <a class={navClass} href={tag.url}> {tag.name}</a>
                <ul class="p-2 bg-slate-50 dark:bg-slate-800">
                  {#each tag.nextInfo as tempInfo}
                    <li>
                      <a class={navClass} href={tempInfo.url}>{tempInfo.name}</a>
                    </li>
                  {/each}
                </ul>
              </li>
            {:else}
              <li>
                <a class={navClass} href={tag.url}>{tag.name}</a>
              </li>
            {/if}
          {/each}
          <li>
            <a class={navClass} href="http://121.4.85.24:1337/admin/auth/login" target="_blank"
              >Login</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 中间导航 -->
    {#if search === 'no'}
      <div class="navbar-center">
        <a class="btn btn-ghost normal-case text-2xl font-display dark:text-gray-200" href="/"
          >ddy's website</a>
      </div>
    {:else}
      <div class="navbar-center bg-white dark:bg-slate-900 relative pointer-events-auto">
        <button
          type="button"
          class="font-body hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
          ><svg width="24" height="24" fill="none" aria-hidden="true" class="mr-3 flex-none"
            ><path
              d="m19 19-3.5-3.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" /><circle
              cx="11"
              cy="11"
              r="6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" /></svg
          >blog,project,photography...<span
            class="font-body ml-auto pl-3 flex-none text-xs font-semibold">⌘K</span
          ></button>
      </div>
    {/if}

    <!-- 右边导航 -->
    <div class="navbar-end">
      <ul class="menu menu-horizontal">
        {#each navTag as tag}
          {#if flag.includes(tag.name)}
            <li tabindex="0" class="hidden lg:flex">
              <p class={navClass}>{tag.name}</p>
              <ul class=" bg-slate-50 dark:bg-slate-800 rounded-md">
                {#each tag.nextInfo as tempInfo}
                  <li>
                    <a class={navClass} href={tempInfo.url}>{tempInfo.name}</a>
                  </li>
                {/each}
              </ul>
            </li>
          {:else}
            <li class="hidden lg:flex">
              <a class={navClass} href={tag.url}>{tag.name}</a>
            </li>
          {/if}
        {/each}
        <li>
          <!-- 深色模式的切换 -->
          <button on:click={toggleDarkMode} class={navClass}>
            {#if isDark}
              <!-- sun icon -->
              <svg
                class="swap-on fill-current w-7 h-7 text-gray-800 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                ><path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            {:else}
              <svg
                class="swap-off fill-current w-7 h-7 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                ><path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            {/if}
          </button>
        </li>
      </ul>
    </div>
  </div>
</header>
