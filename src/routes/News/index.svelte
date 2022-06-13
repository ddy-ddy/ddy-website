<script context="module">
  export async function load({ fetch }) {
    let symbol = 'DOTUSDT';
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=DOTUSDT`);
    const priceInfo = await res.json();
    return {
      props: {
        priceInfo,
      },
    };
  }
</script>

<script>
  import Breadcrumb from '$lib/component/contentLayout/breadCrumb.svelte';
  export let priceInfo;
  let dotPrice = priceInfo.price;
  let breadcrumbInfo = [
    { name: 'Home', url: '/' },
    { name: 'News', url: '' },
  ];
</script>

<sction>
  <Breadcrumb info={breadcrumbInfo} />
  <div class="max-w-screen-xl mx-auto px-8 py-4 sm:px-32 lg:px-48">
    <p class="mt-4 font-bold text-xl dark:text-white">
      dot价格：{dotPrice}
    </p>
  </div>
</sction>
