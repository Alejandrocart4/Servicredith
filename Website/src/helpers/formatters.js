const DEFAULT_LOCALE = 'en-US'

function toFiniteNumber(value) {
  const numericValue = Number(value ?? 0)
  return Number.isFinite(numericValue) ? numericValue : 0
}

export function formatNumber(value, options = {}) {
  return new Intl.NumberFormat(DEFAULT_LOCALE, options).format(toFiniteNumber(value))
}

export function formatCurrency(value, options = {}) {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options

  return `L. ${formatNumber(value, { minimumFractionDigits, maximumFractionDigits })}`
}

export function formatPercent(value, options = {}) {
  const {
    minimumFractionDigits = 1,
    maximumFractionDigits = 1,
  } = options

  return `${formatNumber(value, { minimumFractionDigits, maximumFractionDigits })}%`
}
