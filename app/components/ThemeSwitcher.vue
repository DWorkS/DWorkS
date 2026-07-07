<template>
  <USelectMenu v-model="preference" :icon="preference?.icon" :items="items" :searchInput="false" :dir="dir" />
</template>

<script setup lang="ts">
import * as localesAll from '@nuxt/ui/locale'
const locales = localesAll as Record<string, any>
const { locale } = useI18n()
const colorMode = useColorMode()
const appConfig = useAppConfig()

const mappedLocaleCode = computed(() => locale.value === 'cn' ? 'zh_cn' : locale.value)
const uiLocale = computed(() => locales[mappedLocaleCode.value] || locales.en)

const dir = computed(() => uiLocale.value.dir)
const messages = computed(() => uiLocale.value.messages)

const items = computed(() => [
  { label: messages.value.colorMode.system, value: "system", icon: appConfig.ui.icons.system },
  { label: messages.value.colorMode.light, value: "light", icon: appConfig.ui.icons.light },
  { label: messages.value.colorMode.dark, value: "dark", icon: appConfig.ui.icons.dark }
]);
const preference = computed({
  get() {
    return items.value.find((option) => option.value === colorMode.preference) || items.value[0]
  },
  set(option) {
    if (option) colorMode.preference = option.value
  }
})
</script>