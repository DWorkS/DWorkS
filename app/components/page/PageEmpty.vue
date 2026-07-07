<template>
  <div class="flex flex-col items-center justify-center text-center w-full py-16 px-8">
    <div class="min-h-[400px] flex flex-col items-center justify-center text-center">
      <SimpleImgColorMode :light="getEmptyImage(false)" :dark="getEmptyImage(true)" :alt="emptyImageAlt" loading="lazy"
        preload width="400" />
    </div>
    <div class="my-3 pt-6 text-2xl">
      {{ emptyMessage }}
    </div>
    <div class="my-2">
      {{ emptyTitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const onlineState = useOnline()

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  online: {
    type: Boolean,
    default: undefined
  },
  empty: String,
})

const online = computed(() => props.online !== undefined ? props.online : onlineState.value)
const emptyTitle = computed(() => getEmptyDetails(props.title, 'titles'))
const emptyMessage = computed(() => getEmptyDetails(props.message, 'messages'))

const emptyImageAlt = computed(() => {
  return 'Prehistoric age'
})

function getEmptyDetails(message: string, tag: string) {
  return t(`empty.${tag}.online`)
}

function getEmptyImage(dark: boolean) {
  return '/images/empty/error.gif'
}
</script>