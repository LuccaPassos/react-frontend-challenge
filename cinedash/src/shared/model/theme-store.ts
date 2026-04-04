import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark' | 'auto'

type ThemeState = {
    mode: ThemeMode
    hydrate: () => void
    setMode: (mode: ThemeMode) => void
    toggleMode: () => void
}

const THEME_STORAGE_KEY = 'theme'

function isThemeMode(mode: string | null): mode is ThemeMode {
    return mode === 'light' || mode === 'dark' || mode === 'auto'
}

function getStoredThemeMode(): ThemeMode {
    if (typeof window === 'undefined') {
        return 'auto'
    }

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeMode(stored) ? stored : 'auto'
}

export function applyThemeMode(mode: ThemeMode) {
    if (typeof window === 'undefined') {
        return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolved)

    if (mode === 'auto') {
        document.documentElement.removeAttribute('data-theme')
    } else {
        document.documentElement.setAttribute('data-theme', mode)
    }

    document.documentElement.style.colorScheme = resolved
}

export const useThemeStore = create<ThemeState>()((set, get) => ({
    mode: 'auto',
    hydrate: () => {
        const mode = getStoredThemeMode()
        set({ mode })
        applyThemeMode(mode)
    },
    setMode: (mode) => {
        set({ mode })

        if (typeof window !== 'undefined') {
            window.localStorage.setItem(THEME_STORAGE_KEY, mode)
        }

        applyThemeMode(mode)
    },
    toggleMode: () => {
        const nextMode: ThemeMode =
            get().mode === 'light' ? 'dark' : get().mode === 'dark' ? 'auto' : 'light'

        get().setMode(nextMode)
    },
}))