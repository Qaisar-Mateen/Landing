import React from "react";
import { Feather } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const NavBar = () => {
    return (
        <nav className="site-nav glass-nav z-10 top-8 left-1/2 -translate-x-1/2 fixed flex items-center gap-5 py-2 px-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-sm transition-colors duration-200 ease-in-out" style={{ willChange: 'transform, opacity, background-color, color' }}>
            <a href="">
                <Feather className="h-6 w-6 text-zinc-900 dark:text-white" aria-hidden="true" />
            </a>
            <Link href='/' className="hover:text-zinc-600 dark:hover:text-gray-300 transition-colors">
            <span>Home</span>
            </Link>
            <Link href='/' className="hover:text-zinc-600 dark:hover:text-gray-300 transition-colors">
            <span>Features</span>
            </Link>
            <Link href='/' className="hover:text-zinc-600 dark:hover:text-gray-300 transition-colors">
            <span>Pricing</span>
            </Link>
            <Link href='/' className="hover:text-zinc-600 dark:hover:text-gray-300 transition-colors">
            <span>Contact</span>
            </Link>
            <ThemeToggle />
        </nav>
    );
}

export default NavBar;