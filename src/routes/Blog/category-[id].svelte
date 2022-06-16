<script context="module">
  export async function load({ params, fetch }) {
    const id = params.id;
    const res = await fetch(`/api/blog/category-${id}.json`);
    const [categoryInfo, categoryBlogs] = await res.json();
    return {
      props: {
        categoryInfo,
        categoryBlogs,
      },
    };
  }
</script>

<script>
  import Breadcrumb from '$lib/component/contentLayout/breadCrumb.svelte';
  import TimeLinePage from '$lib/component/pageLayout/timeLinePage.svelte';
  import ContetList from '$lib/component/contentLayout/contetList.svelte';
  export let categoryInfo;
  export let categoryBlogs;
  let pageInfo = {
    title: categoryInfo.title,
    desciption: categoryInfo.description,
  };
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'Blog Category', url: '/Blog/allCategory/' },
    { name: 'Current Category', url: '' },
  ];
</script>

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <TimeLinePage pageInfo={pageInfo}>
    <ContetList blogs={categoryBlogs} searchFlag={true} />
  </TimeLinePage>
</section>
