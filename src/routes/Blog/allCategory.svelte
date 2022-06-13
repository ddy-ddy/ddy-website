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
  import TimeLinePage from '$lib/component/pageLayout/timeLinePage.svelte';
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
  <TimeLinePage pageInfo={pageInfo}>
    <ContetList categories={categories} />
  </TimeLinePage>
</section>
