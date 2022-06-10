<!-- 
  页面的简要说明
 -->
<script>
  export let title;
  export let desciption;
</script>

<header class="py-2 mb-8 sm:text-center">
  <!-- 标题 -->
  <h1
    class="mb-4 text-3xl sm:text-4xl font-display tracking-tight text-slate-900 font-extrabold dark:text-slate-200">
    {title}
  </h1>
  <p class="text-lg text-slate-700 font-body dark:text-slate-400">{desciption}</p>
</header>
