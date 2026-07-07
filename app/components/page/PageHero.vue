<template>
  <div>
    <div class="relative mx-auto h-52 md:h-72 w-full overflow-hidden rounded-xl">
      <BackgroundImg v-if="showImage" :src="image" :alt="title" :index="0" :lazy="false" />
      <div
        class="absolute inset-0 z-20 flex h-full w-full flex-col place-items-center justify-center pointer-events-none"
        :class="textStyles">
        <div class="flex flex-1 flex-col place-items-center justify-center">
          <h1 v-if="title" class="mt-2 px-6 text-center text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {{ title }}
          </h1>
          <div class="mt-2 text-md" v-if="date">
            {{ t('labels.lastupdated') }} : <time :datetime="date">{{ formatDate(date) }}</time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const nuxtApp = useNuxtApp()

const props = defineProps({
  title: {
    type: String,
    default: undefined
  },
  date: {
    type: String,
    default: undefined
  },
  image: {
    type: String,
    default: undefined
  }
})

const showImage = ref(true)
const textStyles = computed(() => showImage.value ? 'text-white' : '')

onMounted(async () => {
  if (!showImage.value) {
    showImage.value = !nuxtApp.isHydrating
  }
})
</script>