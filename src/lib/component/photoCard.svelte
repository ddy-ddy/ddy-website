<!-- 
  card的所有格式：
    1、展示所有照片
    2、展示所有类别
    3、展示某个类别的所有照片
 -->
<script>
  export let photo = false; //展示所有照片
  export let category = false; //展示所有类别
  export let categoryPhoto = false; //展示某个类别的所有照片
  export let categoryInfo;

  function imageShapeToMarginTop(type) {
    // 图片是横图
    if (type.isHorizontal) {
      return 'mt-16 md:mt-36';
    }
    // 图片是竖图
    else {
      return 'mt-32 md:mt-56';
    }
  }
</script>

{#if photo}
  <div class="break-inside-avoid">
    <a class="relative block bg-black group rounded-lg" href={`/Photo/photo-${photo.id}`}>
      <img
        class="absolute inset-0 object-cover w-full h-full transition-opacity opacity-85 dark:opacity-75  group-hover:opacity-50 rounded-lg"
        src={photo.image}
        alt="" />
      <div class="relative p-2">
        <div class={imageShapeToMarginTop(photo)}>
          <div
            class="transition-all transform translate-y-8 opacity-0  group-hover:opacity-100 group-hover:translate-y-0">
            <p class="text-xs md:text-base text-white font-body">
              {@html photo.description}
            </p>
          </div>
        </div>
      </div>
    </a>
  </div>
{:else if category}
  <div class="break-inside-avoid">
    <a class="relative block bg-black group rounded-lg" href="/Photo/category-{category.id}">
      <img
        class="absolute inset-0 object-cover w-full h-full transition-opacity opacity-85 dark:opacity-75  group-hover:opacity-50 rounded-lg"
        src={category.avatar}
        alt="" />
      <div class="relative p-2">
        <p class="text-sm md:text-xl font-bold text-white italic mt-4 px-2 font-display">
          {category.title}
        </p>
        <div class={imageShapeToMarginTop(category)}>
          <div
            class="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
            <p class="text-xs md:text-base text-white font-body">
              {category.description}
            </p>
          </div>
        </div>
      </div>
    </a>
  </div>
{:else if categoryPhoto}
  <div class="break-inside-avoid">
    <a
      class="relative block bg-black group rounded-lg"
      href={`/Photo/photo-${categoryPhoto.id}?${categoryInfo.id}`}>
      <img
        class="absolute inset-0 object-cover w-full h-full transition-opacity opacity-85 dark:opacity-75  group-hover:opacity-50 rounded-lg"
        src={categoryPhoto.image}
        alt="" />
      <div class="relative p-2">
        <div class={imageShapeToMarginTop(categoryPhoto)}>
          <div
            class="transition-all transform translate-y-8 opacity-0  group-hover:opacity-100 group-hover:translate-y-0">
            <p class="text-xs md:text-base text-white font-body">
              {@html categoryPhoto.description}
            </p>
          </div>
        </div>
      </div>
    </a>
  </div>
{/if}
