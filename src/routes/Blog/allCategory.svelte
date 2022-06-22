<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/api/blog/allCategory.json');
    const categories = await res.json();
    return {
      props: {
        categories,
      },
    };
  }
</script>

<script>
  import Breadcrumb from '$lib/component/contentLayout/breadCrumb.svelte';
  import PageDescription from '$lib/component/contentLayout/pageDescription.svelte';
  import ContetList from '$lib/component/contentLayout/contetList.svelte';
  let pageInfo = {
    title: 'All Categories',
    desciption: 'All the latest blog categories, build by ddy.',
  };
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'Blog Categories', url: '' },
  ];
  export let categories;
</script>

<section>
  <Breadcrumb info={breadcrumbInfo} />

  <main class="max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
    <PageDescription title={pageInfo.title} desciption={pageInfo.desciption} />
    <ContetList categories={categories} />
  </main>
</section>
