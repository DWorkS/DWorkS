<template>
  <section class="mx-auto mt-8">
    <h2 class="text-2xl font-bold mb-4">{{ heading }}</h2>
    <UAccordion :items="faqItems" />
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps({
  items: {
    type: Array as PropType<Array<{ q: string; a: string }>>,
    default: () => []
  }
})

const heading = computed(() => t('pages.titles.faq') || 'Frequently Asked Questions')
const faqItems = computed(() => props.items.map(item => ({ label: item.q, content: item.a, icon: 'i-lucide-circle-help' })))
</script>
