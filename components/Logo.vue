import { NuxtImg } from '#build/components';
<template>
  <div class="flex items-center">
    <NuxtImg src="/logo.png" alt="logo" class="mr-2" width="40px" height="40px" loading="lazy" format="webp" />
    <div class="text-2xl font-extrabold">
      <span class="text-primary">D</span><span>WorkS</span>
    </div>
  </div>
</template>