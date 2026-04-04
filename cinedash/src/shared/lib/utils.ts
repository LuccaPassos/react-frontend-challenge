import type { ClassValue } from "clsx";
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(minutes: number, locale = 'pt-BR'): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  const parts = []

  if (hours > 0) {
    parts.push(
      new Intl.NumberFormat(locale, {
        style: 'unit',
        unit: 'hour',
        unitDisplay: 'short',
      }).format(hours)
    )
  }

  if (mins > 0) {
    parts.push(
      new Intl.NumberFormat(locale, {
        style: 'unit',
        unit: 'minute',
        unitDisplay: 'short',
      }).format(mins)
    )
  }

  return parts.join(' ')
}