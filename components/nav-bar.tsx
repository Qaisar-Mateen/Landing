"use client"

import React, { useEffect, useRef, useState } from "react";
import { Feather } from "lucide-react";
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

    return (
        <nav ref={navRef} className="site-nav glass-nav z-10 top-8 left-1/2 -translate-x-1/2 fixed flex items-center gap-4 py-2 px-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-m transition-colors duration-200 ease-in-out" style={{ willChange: 'transform, opacity, background-color, color' }}>
            <Link href='/' aria-label="Home" className="flex items-center gap-2 z-20">
                <Feather className="h-6 w-6 text-zinc-900 dark:text-white" aria-hidden="true" />
            </Link>

            <div ref={itemsContainerRef} className="relative flex items-center gap-2">
                {/* moving indicator */}
                <div
                  aria-hidden
                  className="nav-capsule-indicator bg-primary/20 dark:bg-primary/10 rounded-full shadow-m pointer-events-none"
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
                        <Link key={item.href} href={item.href}>
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

            <div className="ml-3 z-20">
                <ThemeToggle />
            </div>
        </nav>
    );
}

export default NavBar;