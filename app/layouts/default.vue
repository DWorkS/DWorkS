<template>
  <div>
    <Html :lang="i18nHead.htmlAttrs.lang" :dir="i18nHead.htmlAttrs.dir">

    <Head>
      <Title v-if="title">{{ title }}</Title>
      <template v-for="link in i18nHead.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in i18nHead.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>

    <Body>
      <div>
        <Header />

        <UMain>
          <slot />
        </UMain>

        <Footer />
      </div>
    </Body>

    </Html>
  </div>
</template>


<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()

const i18nHead = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
})

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
})


const title = computed(() => route.meta.title)
const isHome = computed(() => route.path === localePath('/'))
</script>