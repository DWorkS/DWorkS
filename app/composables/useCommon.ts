export const imageLoadingAttr = (index: Number) => {
  const { isMobile } = useDevice()
  return isMobile ? (index == 0 ? 'eager' : 'lazy') : (Number(index) <= 2 ? 'eager' : 'lazy')
}

export function formatNumber(value: number, grouping: boolean = false, locale: string = String('en')) {
  const formatter = new Intl.NumberFormat(locale, {
    useGrouping: grouping
  })
  return formatter.format(value)
}

export function formatCompactNumber(value: number, locale: string = String('en')) {
  const formatter = Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1
  })
  return formatter.format(value)
}