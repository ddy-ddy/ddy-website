<!-- 自己的项目页面 -->
<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/api/project/project.json');
    const projects = await res.json();
    return {
      props: {
        projects,
      },
    };
  }
</script>

<script>
  import Breadcrumb from '$lib/component/contentLayout/breadCrumb.svelte';
  import TimeLinePage from '$lib/component/pageLayout/timeLinePage.svelte';
  import ContetList from '$lib/component/contentLayout/contetList.svelte';
  export let projects;
  let pageInfo = { title: 'All Projects', desciption: 'All the latest projects, build by ddy.' };
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/project' },
  ];
</script>

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <TimeLinePage pageInfo={pageInfo}>
    <ContetList projects={projects} />
  </TimeLinePage>
</section>
