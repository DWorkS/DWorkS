<template>
  <UPageHeader :title="title" :description="description" :headline="headline"
    :ui="{ title: '!text-2xl', root: '!py-4', }">
    <div class="mt-2 text-sm text-pretty text-muted" v-if="date">
      {{ t('labels.lastupdated') }} : <time :datetime="date">{{ formatDate(date) }}</time>
    </div>
  </UPageHeader>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps({
  headline: {
    type: String,
    default: undefined
  },
  title: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: undefined
  },
  date: {
    type: String,
    default: undefined
  },
})

</script>
