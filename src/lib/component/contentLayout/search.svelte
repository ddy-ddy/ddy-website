<script>
  import { MeiliSearch } from 'meilisearch';
  import { MeiliSearch_URL } from '$lib/variables.js';
  const client = new MeiliSearch({ host: MeiliSearch_URL });

  /**
   * @description: 使用MeiliSearch进行搜索
   * @param {indexData} 搜索的类别
   * @param {searchData} 搜索的query
   * @return {*}
   */
  let data = '';
  async function search() {
    let indexData = 'blog';
    let searchData = '阅读';
    await client
      .index(indexData)
      .search(searchData)
      .then((res) => {
        data = res.hits;
        console.log(data);
      });
  }
</script>

<div>
  <button class="btn" on:click={search}>点击搜索</button>
  {#if data}
    {#each data as tempData}
      <p>{tempData.id}</p>
      <p>{tempData.link}</p>
    {/each}
  {/if}
</div>

