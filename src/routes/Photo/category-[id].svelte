<script context="module">
  export async function load({ params, fetch }) {
    const id = params.id;
    const res = await fetch(`/api/photo/category-${id}.json`);
    const [categoryInfo, categoryPhotographies] = await res.json();
    return {
      props: {
        categoryInfo,
        categoryPhotographies,
      },
    };
  }
</script>

<script>
  import Breadcrumb from '$lib/component/contentLayout/breadCrumb.svelte';
  import PhotoCard from '$lib/component/contentLayout/photoCard.svelte';
  import DivCustom from '$lib/component/pageLayout/divCustom.svelte';
  import PageDescription from '$lib/component/contentLayout/pageDescription.svelte';
  export let categoryInfo;
  export let categoryPhotographies;
  let pageInfo = {
    title: categoryInfo.title,
    desciption: categoryInfo.description,
  };
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'Photo Category', url: '/Photo/allCategory/' },
    { name: 'Current Category', url: '' },
  ];
</script>

<section>
  <Breadcrumb info={breadcrumbInfo} />
  <DivCustom withGlobalDiv={true}>
    <PageDescription title={pageInfo.title} desciption={pageInfo.desciption} />
    <DivCustom withWaterfall={true} mt="mt-4">
      {#each categoryPhotographies as photography}
        <PhotoCard categoryPhoto={photography} categoryInfo={categoryInfo} />
      {/each}
    </DivCustom>
  </DivCustom>
</section>
