"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Watch for class changes on <html> (next-themes toggles `dark`) and add a
  // short-lived suppressor class to avoid flicker on specific elements (like the nav).
  React.useEffect(() => {
    if (typeof window === "undefined") return

    let timeout: number | undefined
    let prevHasDark: boolean | undefined = document.documentElement.classList.contains("dark")

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && (m.attributeName === "class" || m.attributeName === "")) {
          const hasDark = document.documentElement.classList.contains("dark")
          if (prevHasDark !== undefined && prevHasDark !== hasDark) {
            document.documentElement.classList.add("disable-theme-transition")
            if (timeout) window.clearTimeout(timeout)
            timeout = window.setTimeout(() => {
              document.documentElement.classList.remove("disable-theme-transition")
              timeout = undefined
            }, 350)
          }
          prevHasDark = hasDark
        }
      }
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      observer.disconnect()
      if (timeout) window.clearTimeout(timeout)
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
