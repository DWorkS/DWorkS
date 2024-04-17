<script setup lang="ts">

</script>

<template>
  <div>
    <Header />

    <CoreMain>
      <CorePage>
        <template #left />
        <CorePage>
          <slot />
          <template #right />
        </CorePage>
        <template #right />
      </CorePage>
    </CoreMain>

    <Footer />
  </div>
</template>
