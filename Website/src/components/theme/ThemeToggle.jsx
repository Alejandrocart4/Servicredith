import './ThemeToggle.css'

function SunIcon()
{
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </svg>
  )
}

function MoonIcon()
{
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 15.7A8.5 8.5 0 0 1 8.3 3.8 8.5 8.5 0 1 0 20.2 15.7Z" />
    </svg>
  )
}

export default function ThemeToggle({ theme, onToggle })
{
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : ''}`}
      onClick={onToggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      <span className="theme-toggle-icon theme-toggle-sun"><SunIcon /></span>
      <span className="theme-toggle-thumb" />
      <span className="theme-toggle-icon theme-toggle-moon"><MoonIcon /></span>
    </button>
  )
}
