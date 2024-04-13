<template>
  <div v-if="page">
    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links"
      class="py-10 sm:py-10 md:py-10" :ui="{ title: 'text-4xl sm:text-5xl' }">
      <div
        class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />
    </ULandingHero>

    <ULandingSection class="py-10 sm:py-10 md:pby-10" :ui="{ container: 'gap-10 sm:gap-y-10 flex flex-col' }">
      <div class="text-center flex flex-col items-center">
        <h2 class="text-3xl font-bold tracking-tight text-secondary">
          {{ page.startups.title }}
        </h2>
      </div>
      <UPageGrid>
        <div v-for="(startup, index) in page.startups.items" :key="index" class="break-inside-avoid">
          <UCard :ui="{ strategy: 'override', header: { padding: '' }, body: { padding: 'p-4', } }">
            <template #header>
              <div class="min-w-[380px] h-[185px]">
                <NuxtImg :src="startup.imgUrl" class="w-full rounded-t-lg" draggable="false"
                  :loading="imageLoadingAttr(index)" format="webp" width="380" height="185" />
              </div>
            </template>
            <div class="block text-end -mt-10">
              <UButton icon="i-heroicons-arrow-top-right-on-square" size="xl" color="primary" variant="solid" padded
                :trailing="true" :to="startup.url" target="_blank" />
            </div>
            <div class="text-gray-900 dark:text-white text-base font-bold truncate">
              {{ startup.title }}
            </div>
            <span class="text-[15px] text-gray-500 dark:text-gray-400 mt-1">{{ startup.content }}</span>
          </UCard>
        </div>
      </UPageGrid>
    </ULandingSection>
  </div>
</template>

<script setup lang="ts">

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

definePageMeta({
  layout: 'home'
})

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

</script>
