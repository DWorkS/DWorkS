import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        dblue: {
          50: '#f0f8ff',
          100: '#e0f0fe',
          200: '#b9e2fe',
          300: '#7ccbfd',
          400: '#36b2fa',
          500: '#0c99eb',
          600: '#0071bc',
          700: '#015fa3',
          800: '#065186',
          900: '#0b446f',
          950: '#072b4a',
        }
      }
    }
  }
}
