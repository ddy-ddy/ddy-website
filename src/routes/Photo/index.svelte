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
  import Breadcrumb from '$lib/component/breadCrumb.svelte';
  import PhotoCard from '$lib/component/photoCard.svelte';
  import DivCustom from '$lib/component/divCustom.svelte';
  import PageDescription from '$lib/component/pageDescription.svelte';
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
