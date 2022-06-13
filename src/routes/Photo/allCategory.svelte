<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/api/photo/allCategory.json');
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
  import PhotoCard from '$lib/component/contentLayout/photoCard.svelte';
  import DivCustom from '$lib/component/pageLayout/divCustom.svelte';
  import PageDescription from '$lib/component/contentLayout/pageDescription.svelte';
  let pageInfo = {
    title: 'All Categories',
    desciption: 'All the latest photo categories, build by ddy.',
  };
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'Photo Categories', url: '' },
  ];
  export let categories;
</script>

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <DivCustom withGlobalDiv={true}>
    <PageDescription title={pageInfo.title} desciption={pageInfo.desciption} />
    <DivCustom withWaterfall={true}>
      {#each categories as category}
        <PhotoCard category={category} />
      {/each}
    </DivCustom>
  </DivCustom>
</section>
