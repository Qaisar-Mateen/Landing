import React from "react";
import { Feather } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
    return (
        <nav className="z-10 top-14 left-1/2 -translate-x-1/2 fixed flex items-center gap-5 py-2 px-2 rounded-full bg-black/60 backdrop-blur-md border text-white border-zinc-800">
            <a href="">
                <Feather className="h-6 w-6 text-sky-600 left-10" aria-hidden="true" />
            </a>

            <Link href='/' className="hover:text-gray-300 transition-colors ">
            <span>Features</span>
            </Link>
            <Link href='/' className="hover:text-gray-300 transition-colors ">
            <span>Pricing</span>
            </Link>
            <Link href='/' className="hover:text-gray-300 transition-colors ">
            <span>Solutions</span>
            </Link>
            <Link href='/' className="hover:text-gray-300 transition-colors ">
            <span>Contact</span>
            </Link>
        </nav>
    );
}

export default NavBar;