<template>
  <PageWrapper :loading="!contentData">
    <PageContainer v-if="contentData" :disclaimer="false">
      <UPageHero :title="page?.hero?.title" :description="page?.hero?.description" :links="page?.hero?.links"
        :ui="{ title: 'text-4xl sm:text-5xl', container: '!py-12', }">
        <div
          class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />
      </UPageHero>

      <div class="text-center flex flex-col items-center">
        <h2 class="text-3xl font-bold tracking-tight">
          {{ page?.startups?.title }}
        </h2>
      </div>
      <UPageGrid>
        <div v-for="(startup, index) in page?.startups?.items" :key="index">
          <UCard variant="soft" :ui="{ header: '!p-0' }">
            <template #header>
              <div class="min-w-[30px] h-[185px]">
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
    </PageContainer>
  </PageWrapper>
</template>

<script setup lang="ts">

const localPath = '/'
const { data: contentData } = await useAsyncData(localPath, () => queryCollection('content').path(localPath).first())
if (!contentData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const page = computed(() => contentData.value
  ? { ...contentData.value, ...(contentData.value.meta as Record<string, any>) }
  : null)
definePageMeta({
  layout: 'home'
})

useSeoMeta({
  titleTemplate: '',
  title: page?.value?.title,
  ogTitle: page?.value?.title,
  description: page?.value?.description,
  ogDescription: page?.value?.description
})

</script>
