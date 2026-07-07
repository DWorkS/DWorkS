<template>
  <PageWrapper :loading="!contentData">
    <PageContainer v-if="contentData" :disclaimer="false">
      <template #header>
        <PageTitle :title="contentData.title" />
      </template>
      <PageContent>
        <ContentRenderer :value="contentData" />
      </PageContent>
    </PageContainer>
  </PageWrapper>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const localPath = localePath(route.path)
const { data: contentData } = await useAsyncData(localPath, () => queryCollection('content').path(localPath).first())

const title = computed(() => contentData?.value?.title)
const description = computed(() => contentData?.value?.description)

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
})
</script>