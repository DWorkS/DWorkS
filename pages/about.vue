<script setup lang="ts">
const route = useRoute()
const { buildDate } = useAppConfig()
const buildTime = relativeDate(buildDate)
const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
const links = page.value.links
</script>

<template>
  <Container :links="links">
    <template #header>
      <PageHeader :title="page.title" />
    </template>

    <UPageGrid class="grid-cols-1 sm:grid-cols-2 xl:grid-cols-2">
      <UPageCard class="min-h-[100px]">
        <template #title>
          <div class="flex items-center">
            <UAvatar size="2xl" src="/logo.png" alt="logo" class="mb-6 mr-4" />
            <div> Build: {{ buildTime }}</div>
          </div>
        </template>
        <template #description>
          <span class="text-lg">
            {{ page.about }}
          </span>
        </template>
      </UPageCard>
      <UPageCard class="min-h-[300px]">
        <template #description>
          <div class="text-center">
            <UAvatar size="2xl" src="/images/profile.jpeg" alt="Avatar" class="mb-6" />
          </div>
          <span class="text-lg">
            {{ page.intro }}
            <br>
            <br>
            <div class="text-center">
              Building with ❤️ <br>in Down Under 🦘 🇦🇺
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
            {{ page.origin }}
          </span>
        </template>
      </UPageCard>
      <UPageCard :ui="{ strategy: 'override', body: { padding: '' } }">
        <Map />
      </UPageCard>
    </UPageGrid>
  </Container>
</template>