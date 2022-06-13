<script>
import '../app.css';
import Navigation from '$lib/component/pageLayout/navigation.svelte';
import Footer from '$lib/component/pageLayout/footer.svelte';
import NProgress from 'nprogress';
import { navigating } from '$app/stores';

// NProgress css
import 'nprogress/nprogress.css';

NProgress.configure({
  // Full list: https://github.com/rstacruz/nprogress#configuration
  minimum: 0.16,
});

$: {
  if ($navigating) {
    NProgress.start();
  }
  if (!$navigating) {
    NProgress.done();
  }
}
</script>

<div
  class="flex flex-col h-screen">
  <!-- 导航栏：带search-->
  <Navigation search="yes" />

  <!-- 主内容 -->
  <div class="flex-grow antialiased text-gray-700 dark:text-slate-400 bg-white dark:bg-slate-900">
    <slot />
  </div>

  <!-- 尾部 -->
  <Footer />
</div>
