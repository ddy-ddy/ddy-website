<!-- 首页 -->
<script>
  import { personInformation } from '$lib/variables';
  import Typewriter from 'svelte-typewriter';
</script>

<!-- 首页介绍 -->
<section class="lg:py-24 2xl:py-48">
  <div class="max-w-screen-xl mx-auto px-8 py-6 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-8  lg:items-center">
      <div class="max-w-lg mx-auto text-center lg:text-left lg:mx-10">
        <!-- 打字效果 -->
        <Typewriter interval={100} cascade>
          <h2
            class="lg:text-4xl font-bold text-2xl antialiased font-display text-center dark:text-gray-200">
            Stay hungry, Stay foolish
          </h2>
          <h2
            class="mt-2 lg:text-2xl font-thin text-xl text-center antialiased font-display dark:text-gray-200">
            Let's have a piece of music
          </h2>
        </Typewriter>
        <div class="mt-4 rounded-lg">
          <iframe
            title="no"
            style="border-radius:12px"
            src="https://open.spotify.com/embed/playlist/00kbrw4oq6r4zyZhAtLHit?utm_source=generator"
            width="100%"
            height="155px"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-2">
        {#each personInformation as tempInfo}
          <a
            class="bg-gradient-to-l from-blue-50 via-blue-200 to-amber-300 block p-4 border border-gray-100 shadow-sm rounded-2xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-700 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black dark:border-gray-700"
            href={tempInfo.route}>
            <span class="inline-block p-3 rounded-lg bg-gray-100 ">
              <img src={tempInfo.icon} alt="logo" />
            </span>
            <h6 class="mt-2 font-extrabold font-display text-md lg:text-xl dark:text-gray-200">
              {tempInfo.title}
            </h6>
            <p
              class="font-semibold font-body hidden sm:mt-2 text-sm lg:text-md sm:text-gray-600 sm:block dark:text-gray-300">
              - {tempInfo.info}
            </p>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
