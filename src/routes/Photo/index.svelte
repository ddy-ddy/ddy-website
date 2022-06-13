<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/api/photo/photo.json');
    const photographies = await res.json();
    return {
      props: {
        photographies,
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
    title: 'All Photos',
    desciption: 'All the latest Photos, shooted by ddy.',
  };
  export let photographies;
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'Photos', url: '' },
  ];
</script>

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <DivCustom withGlobalDiv={true}>
    <PageDescription title={pageInfo.title} desciption={pageInfo.desciption} />
    <DivCustom withWaterfall={true}>
      {#each photographies as photography}
        <PhotoCard photo={photography} />
      {/each}
    </DivCustom>
  </DivCustom>
</section>
