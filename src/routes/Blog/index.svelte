<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/api/blog/blog.json');
    const blogs = await res.json();
    return {
      props: {
        blogs,
      },
    };
  }
</script>

<script>
  import Breadcrumb from '$lib/component/contentLayout/breadCrumb.svelte';
  import TimeLinePage from '$lib/component/pageLayout/timeLinePage.svelte';
  import ContetList from '$lib/component/contentLayout/contetList.svelte';
  let pageInfo = {
    title: 'All Blogs',
    desciption: 'All the latest Blogs, straight by ddy.',
  };
  export let blogs;
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '' },
  ];
</script>

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <TimeLinePage pageInfo={pageInfo}>
    <ContetList blogs={blogs} />
  </TimeLinePage>
</section>
