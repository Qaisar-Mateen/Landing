"use client"

import React, { useEffect, useRef, useState } from "react";
import { Feather, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const NavBar = () => {
    const pathname = usePathname() || "/";

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Solutions", href: "/solutions" },
        { label: "Contact", href: "/contact" },
    ]

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/" || pathname === "";
        return pathname.startsWith(href);
    }

    // sliding capsule indicator
    const navRef = useRef<HTMLElement | null>(null)
    const itemsContainerRef = useRef<HTMLDivElement | null>(null)
    const itemRefs = useRef<Record<string, HTMLElement | null>>({})
    const [indicator, setIndicator] = useState({ left: 0, width: 0, height: 0, opacity: 0 })

    const updateIndicator = () => {
        const activeItem = navItems.find((i) => isActive(i.href))
        const el = activeItem ? itemRefs.current[activeItem.href] : null
        const container = itemsContainerRef.current || navRef.current
        if (!container || !el) {
            setIndicator((s) => ({ ...s, opacity: 0 }))
            return
        }
        const containerRect = container.getBoundingClientRect()
        const rect = el.getBoundingClientRect()
        // make capsule slightly wider than the element for comfortable padding
        const extraPadding = 14
        const minWidth = 32
        const width = Math.max(minWidth, Math.round(rect.width + extraPadding))
        const left = Math.round(rect.left - containerRect.left - Math.round(extraPadding / 2))
        const height = Math.round(rect.height + 8)
        setIndicator({ left, width, height, opacity: 1 })
    }

    useEffect(() => {
        updateIndicator()
        const ro = new ResizeObserver(updateIndicator)
        if (navRef.current) ro.observe(navRef.current)
        if (itemsContainerRef.current) ro.observe(itemsContainerRef.current)
        Object.values(itemRefs.current).forEach((el) => el && ro.observe(el))
        window.addEventListener("resize", updateIndicator)
        return () => {
            ro.disconnect()
            window.removeEventListener("resize", updateIndicator)
        }
    }, [pathname])

    const [mobileOpen, setMobileOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)

    // Close mobile menu when path changes
    useEffect(() => setMobileOpen(false), [pathname])

    // close on outside click
    useEffect(() => {
      const onClick = (e: MouseEvent) => {
        if (!mobileOpen) return
        if (!menuRef.current) return
        const target = e.target as Node
        if (!menuRef.current.contains(target) && menuRef.current !== target) {
          setMobileOpen(false)
        }
      }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false)
      }
      document.addEventListener("mousedown", onClick)
      document.addEventListener("keydown", onKey)
      return () => {
        document.removeEventListener("mousedown", onClick)
        document.removeEventListener("keydown", onKey)
      }
    }, [mobileOpen])

    return (
        <nav ref={navRef} className="site-nav glass-nav z-10 top-8 left-1/2 -translate-x-1/2 fixed w-[80vw] sm:w-auto flex items-center justify-between sm:justify-start gap-4 py-2 px-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-m transition-colors duration-200 ease-in-out" style={{ willChange: 'transform, opacity, background-color, color' }}>
            <Link href='/' aria-label="Home" className="flex items-center gap-2 z-20">
                <Feather className="h-6 w-6 text-zinc-900 dark:text-white" aria-hidden="true" />
            </Link>

            {/* Desktop items */}
            <div ref={itemsContainerRef} className="relative hidden sm:flex items-center gap-2">
                {/* moving indicator (only on sm+) */}
                <div
                  aria-hidden
                  className="nav-capsule-indicator hidden sm:block bg-primary/20 dark:bg-primary/10 rounded-full shadow-m pointer-events-none"
                  style={{
                    transform: `translateX(${indicator.left}px) translateY(-50%)`,
                    width: indicator.width ? `${indicator.width}px` : "0px",
                    height: indicator.height ? `${indicator.height}px` : "0px",
                    opacity: indicator.opacity,
                  }}
                />

                {navItems.map((item) => {
                    const active = isActive(item.href)
                    return (
                        <Link key={item.href} href={item.href} className="hidden sm:inline-flex">
                          <span
                            ref={(el) => { itemRefs.current[item.href] = el }}
                            aria-current={active ? 'page' : undefined}
                            className={`relative z-20 inline-flex items-center ${active ? 'px-3 py-1 font-semibold text-primary' : 'px-2 py-1'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`}
                          >
                            <span className={`${active ? 'font-semibold text-primary' : 'font-normal'} text-sm`}>{item.label}</span>
                          </span>
                        </Link>
                    )
                })}
            </div>

            {/* Mobile menu button */}
            <div className="ml-3 flex items-center gap-2">
              <button
                type="button"
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((s) => !s)}
                className="p-2 rounded-md bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 sm:hidden z-30"
              >
                {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
              </button>
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile panel */}
            {mobileOpen && (
              <div ref={menuRef} className="absolute top-full mt-3 right-4 left-auto w-[80vw] sm:left-1/2 sm:-translate-x-1/2 sm:w-[min(92vw,420px)] bg-background text-foreground rounded-xl shadow-lg ring-1 ring-zinc-900/5 p-3 z-40">
                <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-3 py-2 rounded-md ${active ? 'bg-primary/10 text-primary font-semibold' : 'text-zinc-700 dark:text-zinc-200'}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            )}
        </nav>
    );
}

export default NavBar;