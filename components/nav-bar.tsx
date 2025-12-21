"use client"

import React from "react";
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

    return (
        <nav className="site-nav glass-nav z-10 top-8 left-1/2 -translate-x-1/2 fixed flex items-center gap-4 py-2 px-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-m transition-colors duration-200 ease-in-out" style={{ willChange: 'transform, opacity, background-color, color' }}>
            <Link href='/' aria-label="Home" className="flex items-center gap-2">
                <Feather className="h-6 w-6 text-zinc-900 dark:text-white" aria-hidden="true" />
            </Link>

            <div className="flex items-center gap-2">
                {navItems.map((item) => {
                    const active = isActive(item.href)
                    return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={`inline-flex items-center ${active ? 'px-3 py-1 rounded-full bg-primary/20 dark:bg-primary/10 text-primary font-semibold shadow-m' : 'px-2 py-1'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40`}
                        >
                          <span className={`${active ? 'font-semibold text-primary' : 'font-normal'} text-sm`}>{item.label}</span>
                        </Link>
                    )
                })}
            </div>

            <div className="ml-3">
                <ThemeToggle />
            </div>
        </nav>
    );
}

export default NavBar;