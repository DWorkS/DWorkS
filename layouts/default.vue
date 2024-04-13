<script setup lang="ts">

</script>

<template>
  <div>
    <Header />

    <UMain>
      <UPage>
        <template #left />
        <UPage>
          <slot />
          <template #right />
        </UPage>
        <template #right />
      </UPage>
    </UMain>

    <Footer />
  </div>
</template>
