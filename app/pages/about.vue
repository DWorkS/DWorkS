<template>
  <PageWrapper :loading="!contentData">
    <PageContainer v-if="contentData" :disclaimer="false">
      <UContainer>
        <template #header>
          <UPageHeader :title="page.title" />
        </template>

        <UPageGrid class="grid-cols-1 sm:grid-cols-2 xl:grid-cols-2">
          <UPageCard class="min-h-[100px]">
            <template #title>
              <div class="flex items-center">
                <UAvatar size="2xl" src="/logo.png" alt="logo" class="mb-6 mr-4" />
              </div>
            </template>
            <template #description>
              <span class="text-lg">
                {{ page?.about }}
              </span>
            </template>
          </UPageCard>
          <UPageCard class="min-h-[300px]">
            <template #description>
              <div class="text-center">
                <UAvatar size="2xl" src="/images/profile.jpeg" alt="Avatar" class="mb-6" />
              </div>
              <span class="text-lg">
                {{ page?.intro }}
                <br>
                <br>
                <div class="text-center">
                  {{ $t('about.building') }}
                </div>
              </span>
            </template>
          </UPageCard>
          <UPageCard class="min-h-[300px]">
            <template #title>
              <span class="line-clamp-2 mb-6">Why DWorkS?</span>
            </template>
            <template #description>
              <span class="text-lg">
                {{ page?.origin }}
              </span>
            </template>
          </UPageCard>
        </UPageGrid>
      </UContainer>
    </PageContainer>
  </PageWrapper>
</template>

<script setup lang="ts">
const route = useRoute()
const localPath = route.path
const { data: contentData } = await useAsyncData(localPath, () => queryCollection('content').path(localPath).first())
if (!contentData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const page = computed(() => contentData.value
  ? { ...contentData.value, ...(contentData.value.meta as Record<string, any>) }
  : null)

useSeoMeta({
  title: page?.value?.title,
  ogTitle: page?.value?.title,
  description: page?.value?.description,
  ogDescription: page?.value?.description
})

</script>