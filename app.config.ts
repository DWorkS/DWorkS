export default defineAppConfig({
  buildDate: new Date().toISOString(),
  ui: {
    primary: 'dblue',
    gray: 'neutral',
    button: {
      rounded: 'rounded-full',
      default: {
        size: 'md'
      },
      padding: {
        '2xs': 'px-5 py-2.5',
        xs: 'px-5 py-2.5',
        sm: 'px-5 py-2.5',
        md: 'px-5 py-2.5',
        lg: 'px-5 py-2.5',
        xl: 'px-5 py-2.5',
      },
      size: {
        '2xs': 'text-xs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    input: {
      default: {
        size: 'md'
      }
    },
    card: {
      rounded: 'rounded-xl'
    },
    footer: {
      top: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
        container: 'py-8 lg:py-16'
      },
      bottom: {
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    },
    page: {
      hero: {
        wrapper: 'lg:py-24'
      }
    }
  }
})
