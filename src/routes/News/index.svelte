<script>
  import Breadcrumb from '$lib/component/contentLayout/breadCrumb.svelte';
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'News', url: '' },
  ];
</script>

<sction>
  <Breadcrumb info={breadcrumbInfo} />
  <div class="max-w-screen-xl mx-auto px-8 py-4 sm:px-32 lg:px-48">
    <p class="mt-4 font-bold text-xl dark:text-white">
      Hello!
    </p>
  </div>
</sction>
