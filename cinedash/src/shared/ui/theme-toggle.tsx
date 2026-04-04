import { useEffect } from 'react'

import { useThemeStore } from '@/shared/model/theme-store'

export default function ThemeToggle() {
  const mode = useThemeStore((state) => state.mode)
  const hydrateTheme = useThemeStore((state) => state.hydrate)
  const toggleTheme = useThemeStore((state) => state.toggleMode)

  useEffect(() => {
    hydrateTheme()
  }, [hydrateTheme])

  const label =
    mode === 'auto'
      ? 'Theme mode: auto (system). Click to switch to light mode.'
      : `Theme mode: ${mode}. Click to switch mode.`

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="rounded-full border border-(--chip-line) bg-(--chip-bg) px-3 py-1.5 text-sm font-semibold text-(--sea-ink) shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {mode === 'auto' ? 'Auto' : mode === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
