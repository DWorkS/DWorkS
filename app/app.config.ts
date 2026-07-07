export default defineAppConfig({
  title: 'DWorkS',
  primaryColor: '#3b82f6',
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'green',
      neutral: 'neutral'
    },
    button: {
      slots: {
        base: [
          'rounded-full px-5'
        ]
      },
      variants: {
        size: {
          xs: {
            base: 'px-5 py-2.5 text-xs gap-1',
          },
          sm: {
            base: 'px-5 py-2.5 text-xs gap-1.5',
          },
          md: {
            base: 'px-5 py-2.5 text-sm gap-1.5',
          },
          lg: {
            base: 'px-5 py-2.5 text-sm gap-2',
          },
          xl: {
            base: 'px-5 py-2 text-base gap-2',
          }
        }
      },
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'md'
      }
    },
    card: {
      slots: {
        root: 'rounded-xl overflow-hidden',
        header: 'p-4 sm:px-6',
        body: 'p-4 sm:p-6',
        footer: 'p-4 sm:px-6'
      },
      variants: {
        variant: {
          solid: {
            root: 'bg-inverted text-inverted'
          },
          outline: {
            root: 'bg-default ring ring-default divide-y divide-default'
          },
          soft: {
            root: 'bg-elevated/50 divide-y divide-default'
          },
          subtle: {
            root: 'bg-elevated/50 ring ring-default divide-y divide-default'
          },
          simple: {
            root: 'bg-transparent',
          }
        }
      },
      defaultVariants: {
        variant: 'simple'
      }
    },
    input: {
      slots: {
        base: [
          'w-full rounded-full border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
      },
    },
    select: {
      slots: {
        base: [
          'relative group rounded-full inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
        ]
      }
    },
    selectMenu: {
      slots: {
        base: [
          'relative px-5 group rounded-full inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
        ]
      }
    },
    header: {
      slots: {
        container: 'bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50 rounded-b-2xl',
        root: 'flex items-center justify-between gap-3 h-full border-0 bg-transparent',
      }
    },
    footer: {
      slots: {
        top: 'py-2 lg:py-2',
        root: 'px-0 sm:px-6 lg:px-8 py-0', 
        container: 'rounded-t-2xl dark bg-[#23272a]'
      }
    }
  }
})
