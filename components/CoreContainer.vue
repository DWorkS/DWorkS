<template>
  <component :is="as" :class="containerClass" v-bind="attrs">
    <slot />
  </component>
</template>

<script>
import { computed, toRef, defineComponent } from "vue";
import { twMerge, twJoin } from "tailwind-merge";
// import { mergeConfig } from "./node_modules/@nuxt/ui/dist/runtime/utils";
// import appConfig from "#build/app.config";
import { container } from "#ui/ui.config";
//const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.container, container);
const config = container;
export default defineComponent({
  inheritAttrs: false,
  props: {
    as: {
      type: String,
      default: "div"
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("container", toRef(props, "ui"), config);
    const containerClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.padding,
        ui.value.constrained
      ), props.class);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      containerClass
    };
  }
});
</script>
